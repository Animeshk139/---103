let fs = require('fs');


function CeaserEncrypt(text, shift)
{
    text = text.toLowerCase();
    result = '';
    for (let i = 0; i < text.length; i++)
    {
        if (text[i] >= 'a' && text[i] <= 'z')
        {
            result += String.fromCharCode((text[i].charCodeAt(0) + shift - 'a'.charCodeAt(0)) % 26 + 'a'.charCodeAt(0));
        }
        else    
        {
            result += text[i];
        }
    }

    return result;

}




function CeasarDecrypt(text)
{
    let CF = [0.0804, 0.0154, 0.0306, 0.0399, 0.1251, 0.0230, 0.0196, 0.0549, 0.0726, 0.0016, 0.0067, 0.0414, 0.0253, 0.0709, 0.0760, 0.0200, 0.0011, 0.0612, 0.0654, 0.0925, 0.0271, 0.0099, 0.0192, 0.0019, 0.0173, 0.0009];
    let FF = new Array(26).fill(0);
    let len = text.length;
    let total_alpha = 0;
    for (let i = 0; i < len; i++)
    {
        if (text[i] >= 'a' && text[i] <= 'z')
        {

            FF[text[i].charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
            total_alpha += 1;
    
        }


    }
    for (let i = 0; i < FF.length; i ++)
    {
        FF[i] = FF[i] / total_alpha;
    }
    
    let key = 0;
    let min_difference = Number.MAX_VALUE;
    for (let k = 1; k < 26; k++)
    {
        curr_difference = 0;
        for (let i = 0; i < 26; i++)
        {
            curr_difference += Math.pow((CF[i] - FF[(i + k) % 26]), 2);
        }
        if (curr_difference < min_difference)
        {
            min_difference = curr_difference;
            key = k;
        }
    }
    return key;

    
}


let Text = fs.readFileSync('input.txt', 'utf8').toString();

encrypted = CeaserEncrypt(Text, 18);
console.log(encrypted);
console.log(CeasarDecrypt(encrypted));
