import path from 'path';
import { CLIEngine } from 'eslint';

export default function reslint() {
    var cli = new CLIEngine({
        exclude: 'node_modules/**'
    });
    return {
        name: 'reslint',
        transform: (code, id) => {
            let basePath = path.relative(process.cwd(), id).split(path.sep).join('/');
            let relt = cli.executeOnText(code, basePath);

            if (relt.results) {
                let errTips = cli.getFormatter('codeframe')(relt.results);
                console.log(errTips);
            }
        }
    }
}


