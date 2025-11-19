import os
import re
import sys
import json
from typing import List, Dict, Tuple

# NOTE: This script requires the 'googletrans' library
# Install it with: pip install googletrans==4.0.0-rc1
# Or use another translation service of your choice

try:
    from googletrans import Translator
    TRANSLATOR_AVAILABLE = True
except ImportError:
    print("Warning: googletrans library not found. Install it with: pip install googletrans==4.0.0-rc1")
    TRANSLATOR_AVAILABLE = False

class ChineseTextFinder:
    def __init__(self):
        self.chinese_pattern = re.compile(r'[\u4e00-\u9fff]+')
        self.translator = Translator() if TRANSLATOR_AVAILABLE else None
    
    def find_chinese_in_text(self, text: str) -> List[Dict]:
        """Find all Chinese text occurrences with their positions"""
        matches = []
        for match in self.chinese_pattern.finditer(text):
            line_num = text[:match.start()].count('\n') + 1
            col_num = match.start() - text[:match.start()].rfind('\n')
            
            matches.append({
                'text': match.group(),
                'start': match.start(),
                'end': match.end(),
                'line': line_num,
                'column': col_num
            })
        return matches
    
    def translate_text(self, text: str) -> str:
        """Translate Chinese text to English"""
        if not self.translator:
            return f"[TRANSLATION NEEDED: {text}]"
        
        try:
            result = self.translator.translate(text, src='zh-cn', dest='en')
            return result.text
        except Exception as e:
            print(f"Translation error for '{text}': {e}", file=sys.stderr)
            return f"[TRANSLATION FAILED: {text}]"
    
    def process_file(self, file_path: str, translate: bool = False, dry_run: bool = True) -> Dict:
        """Process a single file and return information about Chinese text found"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            chinese_matches = self.find_chinese_in_text(content)
            
            if not chinese_matches:
                return None
            
            result = {
                'file': file_path,
                'matches': []
            }
            
            for match in chinese_matches:
                match_info = {
                    'original': match['text'],
                    'line': match['line'],
                    'column': match['column'],
                    'context': self._get_context(content, match['start'], match['end'])
                }
                
                if translate:
                    match_info['translation'] = self.translate_text(match['text'])
                
                result['matches'].append(match_info)
            
            # If not dry run and translate is enabled, replace the content
            if not dry_run and translate:
                new_content = self._replace_chinese(content, chinese_matches)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                result['replaced'] = True
            
            return result
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}", file=sys.stderr)
            return None
    
    def _get_context(self, text: str, start: int, end: int, context_chars: int = 40) -> str:
        """Get surrounding context for a match"""
        context_start = max(0, start - context_chars)
        context_end = min(len(text), end + context_chars)
        
        before = text[context_start:start]
        match = text[start:end]
        after = text[end:context_end]
        
        return f"...{before}[{match}]{after}..."
    
    def _replace_chinese(self, content: str, matches: List[Dict]) -> str:
        """Replace Chinese text with translations"""
        # Sort matches by position in reverse order to maintain correct positions
        sorted_matches = sorted(matches, key=lambda x: x['start'], reverse=True)
        
        new_content = content
        for match in sorted_matches:
            translation = self.translate_text(match['text'])
            new_content = new_content[:match['start']] + translation + new_content[match['end']:]
        
        return new_content
    
    def scan_directory(self, directory: str, translate: bool = False, dry_run: bool = True) -> List[Dict]:
        """Scan directory for files with Chinese text"""
        results = []
        
        for root, dirs, files in os.walk(directory):
            # Skip node_modules and other common ignore directories
            dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'dist', 'build']]
            
            for file in files:
                # Only process text-based files
                if not file.endswith(('.vue', '.ts', '.js', '.tsx', '.jsx', '.json', '.md', '.txt')):
                    continue
                
                file_path = os.path.join(root, file)
                result = self.process_file(file_path, translate, dry_run)
                
                if result:
                    results.append(result)
        
        return results

def print_results(results: List[Dict], show_translations: bool = False):
    """Pretty print the results"""
    total_files = len(results)
    total_matches = sum(len(r['matches']) for r in results)
    
    print(f"\n{'='*80}")
    print(f"Found {total_matches} Chinese text occurrence(s) in {total_files} file(s)")
    print(f"{'='*80}\n")
    
    for result in results:
        print(f"\n📄 File: {result['file']}")
        print(f"   Found {len(result['matches'])} Chinese text occurrence(s):\n")
        
        for i, match in enumerate(result['matches'], 1):
            print(f"   [{i}] Line {match['line']}, Column {match['column']}")
            print(f"       Original: {match['original']}")
            if show_translations and 'translation' in match:
                print(f"       Translation: {match['translation']}")
            print(f"       Context: {match['context']}")
            print()

def save_report(results: List[Dict], output_file: str = 'chinese_text_report.json'):
    """Save results to a JSON file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Report saved to: {output_file}")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Find and optionally translate Chinese text in source files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Scan src directory and show Chinese text locations
  python translate_chinese_files.py
  
  # Scan and translate (dry run - no files modified)
  python translate_chinese_files.py --translate
  
  # Actually replace Chinese text with translations
  python translate_chinese_files.py --translate --replace
  
  # Scan specific directory
  python translate_chinese_files.py src/views --translate
  
  # Save report to JSON file
  python translate_chinese_files.py --translate --report output.json
        """
    )
    
    parser.add_argument('directory', nargs='?', default='src',
                        help='Directory to scan (default: src)')
    parser.add_argument('--translate', '-t', action='store_true',
                        help='Translate Chinese text to English')
    parser.add_argument('--replace', '-r', action='store_true',
                        help='Replace Chinese text in files (use with --translate)')
    parser.add_argument('--report', '-o', metavar='FILE',
                        help='Save report to JSON file')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.directory):
        print(f"❌ Error: Directory '{args.directory}' not found", file=sys.stderr)
        sys.exit(1)
    
    if args.replace and not args.translate:
        print("❌ Error: --replace requires --translate", file=sys.stderr)
        sys.exit(1)
    
    if args.translate and not TRANSLATOR_AVAILABLE:
        print("❌ Error: Translation requested but googletrans library not available", file=sys.stderr)
        print("Install it with: pip install googletrans==4.0.0-rc1", file=sys.stderr)
        sys.exit(1)
    
    print(f"🔍 Scanning '{args.directory}' for Chinese text...")
    if args.translate:
        print("🌐 Translation enabled")
    if args.replace:
        print("⚠️  REPLACE MODE: Files will be modified!")
    else:
        print("👀 DRY RUN: No files will be modified")
    
    finder = ChineseTextFinder()
    results = finder.scan_directory(
        args.directory,
        translate=args.translate,
        dry_run=not args.replace
    )
    
    if not results:
        print("\n✅ No Chinese text found!")
        return
    
    print_results(results, show_translations=args.translate)
    
    if args.report:
        save_report(results, args.report)
    
    if args.replace:
        print(f"\n✅ Successfully replaced Chinese text in {len(results)} file(s)")

if __name__ == "__main__":
    main()
