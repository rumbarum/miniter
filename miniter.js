//extarea 글자수 제한, 글자수 표시 
//100자 제한해보기 n/100. 
// 글자수 세기 100자 넘어감(키오프로 판정하기) ? 얼럿 : 낫띵.

//글자 입력 제한 
let inputText = document.getElementsByClassName("textInput")[0] 
let textlimitshow =document.getElementsByClassName("textlimitshow")[0]
inputText.addEventListener("keyup", ()=> { 
    if(inputText.value.length<=100){
        textlimitshow.innerHTML=`${inputText.value.length}/100`;
        textlimitshow.style.color="black";
    
    }else {
        textlimitshow.innerHTML=`${inputText.value.length}/100`;
        inputText.value = inputText.value.slice(0,100)
        alert("100자 까지만 입력가능!!!")
        textlimitshow.innerHTML=`${inputText.value.length}/100`;
    }
});

/* 트윗 버튼 누르면 실제로 추가된다. 
1.데이터 자리 마련 
    필요한 데이터 구분, 입력 양식생각 
2.더미데이터를 입력 
3. tweet 공간에 출력 함수 짜기 
    트윗자리 데이터 수만큼 만들고, 그 자리에 데이터 매칭 시켜서 입력한다.
3.트위터 작성시 데이터 공간에 저장
4. 저장된 자료 리프레쉬 

*/

tweetData = [
    
   {id:11111,
    cont: `동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세.무궁화 삼천리 화려강산 한 사람, 대한으로 길이 보전하세.`,
    date: '2018-01-01 18:00'
   },
   {
    id:22222,
    cont:'남산위에 저 소나무, 철갑을 두른 듯 바람서리 불변함은 우리 기상일세.무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세.',
    date:'2018-02-02 19:00'
},
{
    id:33333,
    cont:'가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세.무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세.',
    date: '2018-03-03 12:00'
},
{
   id: 44444,
   cont: '이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세.',
   date: '2018-04-04 11:00'
}
] 

//기존 데이터 불러오기 
let makingTweet = () => {
    // 데이터 길이만큼 반복한다.  
   for(let i = tweetData.length-1; i >=0  ; i-- ){
    let boxingmaking= document.createElement("div");
    boxingmaking.className="tweetContentsBoxing" ; 

    let namemaking= document.createElement("div");
    namemaking.className="nameOfWriter" ; 
    namemaking.innerHTML=tweetData[i].id  ;
    
    let dateMaking= document.createElement("div")
    dateMaking.className="dateOfTweet" ; 
    dateMaking.innerHTML=tweetData[i].date  ;

    let contentsmaking= document.createElement("div");
    contentsmaking.className="tweetContents" ; 
    contentsmaking.innerHTML=tweetData[i].cont ;
    //delete 버튼생성 및 동작 연결 시키기 
    if(tweetData[i].id === document.getElementsByClassName("userName")[0].innerHTML){
    let deleteMaking = document.createElement("input");
    deleteMaking.className="deleteButton" ;
    deleteMaking.type="button" ;
    deleteMaking.value="Delete" ;
    deleteMaking.addEventListener("click", (e)=> {
        let olddataContainer= document.getElementsByClassName("tweetContainer")[0];
        olddataContainer.removeChild(e.target.parentNode);//html 삭제, 데이터도 삭제. 
        tweetData.splice(i,1);
        let coutnNumber = document.getElementsByClassName("tweetCount")[0] ;
        coutnNumber.innerHTML = tweetData.length
    })
    boxingmaking.appendChild(deleteMaking);
    } 
    let tweetcontainer = document.getElementsByClassName("tweetContainer")[0]
 
    boxingmaking.appendChild(namemaking);
    boxingmaking.appendChild(dateMaking);
    boxingmaking.appendChild(contentsmaking);
    tweetcontainer.appendChild(boxingmaking);
   };
   //delete 버튼 작동시키기 
   //각각의 버튼 작동 시키기, 
   //타켓팅 => event.taget.parenNode 

   //트윗개수 프로필에 추가 
   let coutnNumber = document.getElementsByClassName("tweetCount")[0] ;
   coutnNumber.innerHTML = tweetData.length

}
makingTweet()

//기존 출력물 지우고 새로 출력 하는거
let deletOldContent = () => {
    let olddataContainer= document.getElementsByClassName("tweetContainer")[0];
    for(let i =tweetData.length ; i>1 ; i--){
    let olddateContents = document.getElementsByClassName("tweetContentsBoxing")[0] ;
    olddataContainer.removeChild(olddateContents); }
 }


//날짜 생성기 
let getTheDate = () => {
    let date = new Date ; 
    let year = date.getFullYear();
    let month =date.getMonth()+1;
    let date2 = date.getDate() ; 
    let hour = date.getHours(); 
    let minute = date.getMinutes();
    if(String(month).length===1){
        month= ("0"+String(month))
   };
   if(String(date2).length===1){
     date2= ("0"+String(date2))
   };
   if(String(hour).length===1){
    hour= ("0"+String(hour))
   };
   if(String(toString).length===1){
    minute= ("0"+String(minute))
   };

   return `${year}-${month}-${date2} ${hour}:${minute}`
}

//신규 트윗 추가 
let pushButton = document.getElementsByClassName("tweetButton")[0];
pushButton.addEventListener("click",() => {
    let newtweetData = {} ;
    newtweetData.id = document.getElementsByClassName("userName")[0].innerHTML ;
    newtweetData.cont= inputText.value ;
    newtweetData.date= getTheDate();
    tweetData.push(newtweetData);
    deletOldContent();  
    makingTweet();
});


