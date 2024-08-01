const info = document.querySelector(".enter-player-info")

info.addEventListener("click",(e)=>{
    info.innerHTML="<p>Please Enter Player-X & Player-O Name</p>"
})

const form = document.querySelector("form")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const player1name=document.querySelector("#player1").value
    const player2name=document.querySelector("#player2").value
    const buttons=document.querySelectorAll(".button-box")
    const winner=document.querySelector(".declare-winner")
    const restart=document.querySelector("#restart")
    const submit =document.querySelector("#submit")


    submit.disabled=true
    info.style.display="none"
    restart.style.display="block"




    let playerturnX=true

    console.log(`player1name : ${player1name}`);
    console.log(`player2name : ${player2name}`);




    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    buttons.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            if (playerturnX) {
                button.innerHTML="X"
                playerturnX=false
            }else{
                button.innerHTML="O"
                playerturnX=true
            }
            checkwinner(player1name,player2name)
            button.disabled=true
        })
    })

    function checkwinner(player1name,player2name){

        let draw = true

        for (const index of winningConditions) {
            let positionVal0=buttons[index[0]].textContent
            let positionVal1=buttons[index[1]].textContent
            let positionVal2=buttons[index[2]].textContent

            // console.log(index)
            // console.log(positionVal1)
            // console.log(positionVal2)
            

            if (positionVal0 !="" && positionVal1 !="" && positionVal2 != "") {
                if (positionVal0==positionVal1 && positionVal1==positionVal2) {
                    if (positionVal0=="X" && positionVal1=="X" && positionVal2 =="X") {
                        winner.style.display="block"
                        winner.innerHTML=`Winner of the match is Player-X  ${player1name}!`
                        for (let box of buttons) {
                            box.disabled=true
                        }
                        lineStricker(index)
                        return
                    }else if(positionVal0=="O" && positionVal1=="O" && positionVal2 =="O"){
                        winner.style.display="block"
                        winner.innerHTML=`Winner of the match is Player-O  ${player2name}!`
                        for (let box of buttons) {
                            box.disabled=true
                        }
                        lineStricker(index)
                        return
                    }
                    // console.log(`Winner is declared`)
                }
            }
            if(positionVal0==="" || positionVal1==="" || positionVal2===""){
                draw=false
            }
        }
        if (draw) {
            winner.style.display="block"
            winner.innerHTML=`Match ended in draw challange again!`
        }

    }

    restart.addEventListener("click",(e)=>{
        buttons.forEach((button)=>{
            button.innerHTML=""
            playerturnX=true
            button.disabled=false
            // restart.style.display="none"
            winner.style.display="none"
            submit.disabled=false
            rowline.style.display="none"
            columline.style.display="none"
            diagonalline.style.display="none"
        })
        
    })

    const rowline=document.querySelector(".row")
    const columline=document.querySelector(".col")
    const diagonalline=document.querySelector(".diagonal")

    function lineStricker(index){
        const row01=document.querySelector("#row-line1")
        const row02=document.querySelector("#row-line2")
        const row03=document.querySelector("#row-line3")

        const col01=document.querySelector("#col-line1")
        const col02=document.querySelector("#col-line2")
        const col03=document.querySelector("#col-line3")

        const dia01=document.querySelector("#dia-line1")
        const dia02=document.querySelector("#dia-line2")



        switch (index.toString()) {

            case "0,1,2":
                columline.style.display="flex"
                col01.style.opacity=1
                col02.style.opacity=0
                col03.style.opacity=0
                break;

            case "3,4,5":
                columline.style.display="flex"
                col01.style.opacity=0
                col02.style.opacity=1
                col03.style.opacity=0
                break;

            case "6,7,8":
                columline.style.display="flex"
                col01.style.opacity=0
                col02.style.opacity=0
                col03.style.opacity=1
                break;

            case "0,3,6":
                rowline.style.display="flex"
                row01.style.opacity=1
                row02.style.opacity=0
                row03.style.opacity=0
                break;

            case "1,4,7":
                rowline.style.display="flex"
                row01.style.opacity=0
                row02.style.opacity=1
                row03.style.opacity=0
                break;
            case "2,5,8":
                rowline.style.display="flex"
                row01.style.opacity=0
                row02.style.opacity=0
                row03.style.opacity=1
                break;

            case "0,4,8":
                console.log(index.toString())
                diagonalline.style.display="flex"
                dia02.style.opacity=1
                dia01.style.opacity=0
                break;
                
            case "2,4,6":
                diagonalline.style.display="flex"
                dia01.style.opacity=1
                dia02.style.opacity=0
                break;

            default:
                break;
        }
    }

})
