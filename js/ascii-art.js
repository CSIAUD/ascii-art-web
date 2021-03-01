const input=document.getElementById('input'); // Récupération de l'entrée de texte
const output=document.getElementById('output'); // Récupération de la sortie du ascii-art

const color=document.getElementById('color'); // Récupération du choix de la couleur
const police=document.getElementsByName('font'); // Récupération du choix de la police à utiliser
const align=document.getElementsByName('align'); // Récupération de l'alignement à utiliser

const fichier0=document.getElementById('fichier0'); // Récupération du 1er fichier ascii
const fichier1=document.getElementById('fichier1'); // Récupération du 2eme fichier ascii
const fichier2=document.getElementById('fichier2'); // Récupération du 3eme fichier ascii

const ascii=[JSON.parse(fichier0.innerText),JSON.parse(fichier1.innerText),JSON.parse(fichier2.innerText)];

const chars=['!','\"','#','$','%','&','\'','(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}','~','\n',' '];

//===================================

color.addEventListener('load', () => {
    output.style.color = color.value
})
color.addEventListener('change', () => {
    output.style.color = color.value
})

//===================================

let valid=false;
for(let i=0; i<police.length; i++){
    if(police[i].checked===true){
        valid=true;
    }
}
if(valid===false){
    police[0].checked=true
}

//===================================

valid=false;
for(let i=0; i<align.length; i++){
    if(align[i].checked===true){
        valid=true;
    }
}
if(valid===false){
    align[0].checked=true
}

//===================================

afficherAscii()
function afficherAscii(){
    let text = ""
    let lettres=[];
    lettres.push([]);
    let nbRt=0;
    let font = 0;
    for(let i=0; i<police.length; i++){
        if(police[i].checked===true){
            font=i;
            break;
        }
    }

    //------------------------------

    for(let val of input.value){
        for(let char of chars){
            if(val === char){
                text += val
                break
            }
        }
    }
    // console.log(text)


    //------------------------------

    for(let i=0; i<text.length; i++){
        if(text[i]==='\n'){
            lettres.push([]);
            nbRt++;
        }else{
            lettres[nbRt].push(chars.indexOf(text[i]));
        }
    }

    //------------------------------

    let txt="";
    for(let l=0; l<=nbRt; l++){
        txt+="<table cellspacing='0' cellpadding='0'><tr>";

        let i=0;
        let j=0;
        let k=0;

        while(i<8){
            txt+= "<tr>";
            while(j<lettres[l].length){
                if(lettres[l][j]===95){
                    txt+="<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
                }else{
                    while(k<ascii[font][lettres[l][j]][i].length){
                        if (ascii[font][lettres[l][j]][i][k]===' '){
                            txt+="<td>&nbsp;&nbsp;</td>";
                        }else{
                            txt+="<td>"+ascii[font][lettres[l][j]][i][k]+"</td>";
                        }
                        k++;
                    }
                }
                j++;
                k=0;
            }
            txt+= "</tr>";
            i++;
            j=0;
        }
        txt+="</table>";
    }

    //===================================

    output.innerHTML=txt;
    output.style.color = color.value
    let count = 0
    for(let i of align){
        if(i.checked === true){
            break
        }
        count++
    }
    document.getElementsByTagName('table')[0].style.margin = align[count].value
}
