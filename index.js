import path from 'path';
import { createFilter } from 'rollup-pluginutils';
import { CLIEngine } from 'eslint';

export default function reslint() {
    var cli = new CLIEngine({
        fix: true,
        exclude: 'node_modules/**'
    });
    
    return {
        name: 'reslint',
        transform: (code, id) => {
            var file = normalizePath(id),
                relt = cli.executeOnText(code, file),
                isExclude = !createFilter(options.include, options.exclude || /node_modules/)(id);

            if (cli.isPathIgnored(file) || isExclude) return null;
            if (relt.results) console.error(cli.getFormatter('codeframe')(relt.results));
        }
    }
}


