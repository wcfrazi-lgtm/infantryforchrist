"""Package only Shopify theme files; never include local exports, credentials, or tools."""
import pathlib
import zipfile

root = pathlib.Path(__file__).resolve().parents[1]
theme = root / 'theme'
output = root / 'dist' / 'infantry-for-christ-theme.zip'
output.parent.mkdir(exist_ok=True)
allowed = {'assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'}
files = sorted(p for p in theme.rglob('*') if p.is_file())
assert (theme / 'layout/theme.liquid').exists(), 'Missing theme layout'
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in files:
        relative = file.relative_to(theme)
        assert relative.parts[0] in allowed, f'Unexpected theme entry: {relative}'
        assert file.resolve().is_relative_to(theme.resolve()), 'Symlink outside theme'
        archive.write(file, relative.as_posix())
with zipfile.ZipFile(output) as archive:
    assert archive.testzip() is None, 'Corrupt ZIP'
print(f'Packaged {len(files)} files: {output}')
