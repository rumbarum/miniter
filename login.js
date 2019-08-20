

const login = ( ) => {
    let logintype = document.getElementsByClassName("typecontents_login")
     if(logintype[0].value.length===0 || logintype[1].value.length===0){
        return alert("빼놓으신 폼을 입력해주세요!!!")   
     }
     
     data2 = {
         iddd : logintype[0].value,
         password: logintype[1].value,
         profile: "logincheck",
         name : "logincheck",
     } 

     function goTweet() { location.href="tweets.html"; }
  
     fetch("http://127.0.0.1:8000/signup/", {
      method: 'POST', 
      body: JSON.stringify(data2),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    // .then(res => console.log(res))
    .then(response => {
        console.log(response)
        console.log(data2)
        if (response.Result==="LoginSuccess"){
            fetch("http://127.0.0.1:8000/login/", {
            method: 'POST', 
            body: JSON.stringify({
                iddd : logintype[0].value,
                password : logintype[1].value,
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .catch(err=> console.log('error:', err));
          alert('방문을 환영합니다!');
          goTweet();
        }
        if (response.Result==="Noiddd"){
            alert("비밀번호를 확인해주세요");
        }
        if(response.Result==="LoginFailed"){
            alert("ID를 확인해주세요.");
        }else{
            return new Error (" 나도 모르는 에러가..")
        };
       })
    // .then( response => goTweet() )
    .catch(error => console.error('Error:', error));
  
  }
  
  let loginbtn = document.getElementsByClassName("typebutton_login")[0]
  loginbtn.addEventListener("click", login)
  
