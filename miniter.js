
//렌더링 펑션으로 묶기   

function calltweet(){
   fetch("http://127.0.0.1:8000/login/")
  .then(res => res.json())
  .then(res => {
      let rename= res.Result
       //이안에 로그인 정보로 데이터 get 하기 ok
      // created_at 정보 참고하여 날짜 변환하기 => 필터링해서 순서 만들기 

     // 데이터로 html 렌더링하기 
       //화면 콘텐츠 표시 
      //유저정보 표시
   var sended={
        search: rename,
        typeofAsking: "getdata",
    }
    let recivedData =  fetch("http://127.0.0.1:8000/tweet/", {
        method: 'POST', 
        body: JSON.stringify(sended),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => {  
        document.getElementsByClassName("userName")[0].innerHTML = res[0]["iddd"]
        var tweetData2=[]
        for(let k = 0; k< res.length ; k++){
            let tweetData4={}
            tweetData4["id"]=res[k]["iddd"];
            tweetData4["cont"]=res[k]["content"];
            tweetData4["date"]=res[k]["created_at"];
            tweetData2.push(tweetData4)
        }
              
        let makingTweet = () => {
            // 데이터 길이만큼 반복한다.  
           for(let i = tweetData2.length-1; i >=0  ; i-- ){
            let boxingmaking= document.createElement("div");
            boxingmaking.className="tweetContentsBoxing" ; 
        
            let namemaking= document.createElement("div");
            namemaking.className="nameOfWriter" ; 
            namemaking.innerHTML=tweetData2[i].id  ;
            
            let dateMaking= document.createElement("div")
            dateMaking.className="dateOfTweet" ; 
            dateMaking.innerHTML=tweetData2[i].date  ;
        
            let contentsmaking= document.createElement("div");
            contentsmaking.className="tweetContents" ; 
            contentsmaking.innerHTML=tweetData2[i].cont ;
            //delete 버튼생성 및 동작 연결 시키기 
            if(tweetData2[i].id === document.getElementsByClassName("userName")[0].innerHTML){
            let deleteMaking = document.createElement("input");
            deleteMaking.className="deleteButton" ;
            deleteMaking.type="button" ;
            deleteMaking.value="Delete" ;
            deleteMaking.addEventListener("click", (e)=> {
                let olddataContainer= document.getElementsByClassName("tweetContainer")[0];
              
                delData = {
                    name: e.target.id,
                    content: e.target.cont,
                    date: e.target.date,
                    typeofAsking: "deletedata",
                }
                   fetch("http://127.0.0.1:8000/tweet/", {
                    method: 'POST', 
                    body: JSON.stringify(delData),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    }).then(res => res.json())
                    .then(res => console.log(res))
                    .catch(error => console.error('Error:', error));

                olddataContainer.removeChild(e.target.parentNode);//html 삭제, 데이터도 삭제. 
                // 데이터 지우기 작업 들어갑니다.. 
                let countNumber = document.getElementsByClassName("tweetCount")[0] ;
                countNumber.innerHTML = olddataContainer.childElementCount
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
           let coutnNumber = document.getElementsByClassName("tweetCount")[0];
           coutnNumber.innerHTML = document.getElementsByClassName("tweetContainer")[0].childElementCount

        }
        makingTweet(); 
       })
        
      .catch(error => console.error('Error:', error));

    // console.log(recivedData)  
 })
  .catch(err => console.log(err));
}

calltweet()
 
 let deletOldContent = () => {
    let olddataContainer= document.getElementsByClassName("tweetContainer")[0];
    console.log(document.getElementsByClassName("tweetCount")[0].innerHTML)
    for(let i =document.getElementsByClassName("tweetCount")[0].innerHTML ; i>0 ; i--){
    let olddateContents = document.getElementsByClassName("tweetContentsBoxing")[0] ;
    olddataContainer.removeChild(olddateContents); }
 }

let pushButton = document.getElementsByClassName("tweetButton")[0];
pushButton.addEventListener("click",() => {
    let newtweetData2 = {} ;
    newtweetData2.iddd = document.getElementsByClassName("userName")[0].innerHTML ;
    newtweetData2.content= inputText.value ;
    newtweetData2.date= new Date;
    newtweetData2.typeofAsking="";
    
    fetch("http://127.0.0.1:8000/tweet/", {
    method: 'POST', 
    body: JSON.stringify(newtweetData2),
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error('Error:', error));
    deletOldContent();  
    calltweet();
});



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

tweetData3 = [
    
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

// makingTweet()

//기존 출력물 지우고 새로 출력 하는거

//날짜 생성기 
let getTheDate = ( given ) => {
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
   if(String(minute).length===1){
    minute= ("0"+String(minute))
   };

   return `${year}-${month}-${date2} ${hour}:${minute}`
}

// //신규 트윗 추가 
// let pushButton = document.getElementsByClassName("tweetButton")[0];
// pushButton.addEventListener("click",() => {
//     let newtweetData2 = {} ;
//     newtweetData2.id = document.getElementsByClassName("userName")[0].innerHTML ;
//     newtweetData2.cont= inputText.value ;
//     newtweetData2.date= getTheDate();
//     tweetData2.push(newtweetData2);
//     deletOldContent();  
//     makingTweet();
// });

// //마우스 오버할때마다 랜덤으로ß
// fetch("http://127.0.0.1:8000/tweet/")
// .then(response => response.json())
// .then(json => console.log(json[0]))
// .catch(err => console.log(err));





// fetch(url, {
//   method: 'POST', 
//   body: JSON.stringify(data),
//   headers:{
//     'Content-Type': 'application/json'
//   }
// }).then(res => res.json())
// .then(response => console.log('Success:', JSON.stringify(response)))
// .catch(error => console.error('Error:', error));


// // 포스팅 펑션 
const postinFn = (postingUrl, postingData) => {
    fetch(postingUrl, {
        method: 'POST', 
        body: JSON.stringify(postingData),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.error('Error:', error));
}
