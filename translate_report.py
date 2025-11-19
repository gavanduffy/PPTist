#!/usr/bin/env python
"""
Utility script that reads the chinese_text_report.json file, translates every
unique Chinese string into English, and produces (1) a translation map for
reuse and (2) a new report file with translations embedded in each match.
"""

import argparse
import json
from pathlib import Path
from typing import Dict, List, Sequence, Set

import torch
from transformers import MarianMTModel, MarianTokenizer


def load_report(path: Path) -> List[Dict]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def gather_unique_strings(report: List[Dict]) -> List[str]:
    seen: Set[str] = set()
    ordered: List[str] = []
    for entry in report:
        for match in entry.get("matches", []):
            text = match.get("original")
            if text is not None and text not in seen:
                seen.add(text)
                ordered.append(text)
    return ordered


class MarianTranslator:
    """Lightweight wrapper around Helsinki-NLP MarianMT models."""

    def __init__(self, model_name: str = "Helsinki-NLP/opus-mt-zh-en"):
        self.tokenizer = MarianTokenizer.from_pretrained(model_name)
        self.model = MarianMTModel.from_pretrained(model_name)
        device = "cuda" if torch.cuda.is_available() else "cpu"
        self.device = torch.device(device)
        self.model.to(self.device)

    def translate(self, texts: Sequence[str]) -> List[str]:
        encoded = self.tokenizer(
            list(texts),
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512,
        )
        encoded = {k: v.to(self.device) for k, v in encoded.items()}
        with torch.no_grad():
            generated = self.model.generate(
                **encoded, max_length=512, num_beams=4, early_stopping=True
            )
        return self.tokenizer.batch_decode(generated, skip_special_tokens=True)


def build_translation_map(
    unique_texts: List[str],
    translator: MarianTranslator,
    batch_size: int = 40,
    existing_map: Dict[str, str] | None = None,
    map_path: Path | None = None,
) -> Dict[str, str]:
    translations: Dict[str, str] = dict(existing_map or {})
    pending = [text for text in unique_texts if text not in translations]

    for i in range(0, len(pending), batch_size):
        batch = pending[i : i + batch_size]
        if not batch:
            continue
        translated = translator.translate(batch)
        translations.update(dict(zip(batch, translated)))
        if map_path:
            with map_path.open("w", encoding="utf-8") as f:
                json.dump(translations, f, ensure_ascii=False, indent=2)
    return translations


def inject_translations(report: List[Dict], translations: Dict[str, str]) -> None:
    for entry in report:
        for match in entry.get("matches", []):
            text = match.get("original")
            if text is None:
                continue
            match["translation"] = translations.get(text, "")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Translate strings listed in chinese_text_report.json."
    )
    parser.add_argument(
        "--input",
        "-i",
        default="chinese_text_report.json",
        help="Input JSON report file.",
    )
    parser.add_argument(
        "--output",
        "-o",
        default="chinese_text_translated.json",
        help="Output JSON file with translations embedded.",
    )
    parser.add_argument(
        "--map",
        "-m",
        default="chinese_translation_map.json",
        help="Output file for the translation map (original -> translation).",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=40,
        help="Number of strings to translate per request.",
    )
    args = parser.parse_args()

    report_path = Path(args.input)
    output_path = Path(args.output)
    map_path = Path(args.map)

    report = load_report(report_path)
    unique_texts = gather_unique_strings(report)

    translator = MarianTranslator()
    existing_map = {}
    if map_path.exists():
        with map_path.open("r", encoding="utf-8") as f:
            existing_map = json.load(f)

    translations = build_translation_map(
        unique_texts,
        translator,
        batch_size=args.batch_size,
        existing_map=existing_map,
        map_path=map_path,
    )

    if map_path:
        with map_path.open("w", encoding="utf-8") as f:
            json.dump(translations, f, ensure_ascii=False, indent=2)

    inject_translations(report, translations)

    with output_path.open("w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
