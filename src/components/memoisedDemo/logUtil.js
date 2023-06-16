const styles = [
    'background: yellow',
    'color: green',
    'padding: 8px'
];

export const colorLog = (str, applyColor) => {
    if(applyColor) {
        console.log(`%c${str}`, styles.join(';'))
        return;
    }
    console.log(str);
}