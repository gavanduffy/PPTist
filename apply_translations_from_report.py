#!/usr/bin/env python
"""
Apply translations stored in chinese_text_translated.json back to the source files.
"""

import argparse
import json
from pathlib import Path
from typing import Dict, List, Tuple


def load_report(path: Path) -> List[Dict]:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def sort_matches(matches: List[Dict]) -> List[Dict]:
    # Sort by line DESC, column DESC to avoid messing with earlier positions
    return sorted(
        matches,
        key=lambda m: (m.get("line", 0), m.get("column", 0)),
        reverse=True,
    )


def replace_text(line: str, column: int, original: str, replacement: str) -> Tuple[str, bool]:
    index = max(column - 1, 0)
    snippet = line[index : index + len(original)]

    if snippet != original:
        # Try to locate the substring anywhere in the line
        index = line.find(original)
        if index == -1:
            return line, False

    new_line = line[:index] + replacement + line[index + len(original) :]
    return new_line, True


def apply_replacements(file_path: Path, matches: List[Dict], dry_run: bool = False) -> bool:
    if not file_path.exists():
        print(f"[WARN] File not found: {file_path}")
        return False

    content = file_path.read_text(encoding="utf-8")
    lines = content.splitlines(keepends=True)
    changed = False

    for match in sort_matches(matches):
        translation = match.get("translation")
        original = match.get("original")
        line_no = match.get("line")
        column = match.get("column")

        if not translation or original is None or line_no is None or column is None:
            print(f"[SKIP] Missing data for match in {file_path}: {match}")
            continue

        if line_no - 1 >= len(lines) or line_no <= 0:
            print(f"[SKIP] Invalid line number for {file_path}: {match}")
            continue

        line_idx = line_no - 1
        updated_line, success = replace_text(lines[line_idx], column, original, translation)

        if not success:
            print(
                f"[WARN] Could not replace text in {file_path} "
                f"(line {line_no}, column {column}): '{original}'"
            )
            continue

        lines[line_idx] = updated_line
        changed = True

    if changed and not dry_run:
        file_path.write_text("".join(lines), encoding="utf-8")

    return changed


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Replace Chinese strings in files based on a translated report."
    )
    parser.add_argument(
        "--report",
        "-r",
        default="chinese_text_translated.json",
        help="JSON report file that already includes translations.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Scan and report changes without modifying files.",
    )
    args = parser.parse_args()

    report_path = Path(args.report)
    report = load_report(report_path)

    for entry in report:
        file_rel = entry.get("file")
        if not file_rel:
            continue
        file_path = Path(file_rel)
        if file_path.is_absolute():
            path = file_path
        else:
            path = Path(".") / file_path
        matches = entry.get("matches", [])
        if not matches:
            continue
        changed = apply_replacements(path, matches, dry_run=args.dry_run)
        status = "UPDATED" if changed else "SKIPPED"
        print(f"[{status}] {path}")


if __name__ == "__main__":
    main()
