export default function hooksPlugin({ rmFiles, afterBuild, beforeBuild }: {
    rmFiles?: string[];
    afterBuild?: Function;
    beforeBuild?: Function;
}): {
    name: string;
    buildStart(): void;
    buildEnd(err?: Error): void;
};
