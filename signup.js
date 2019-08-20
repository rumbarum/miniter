

const signup = ( ) => {
  let signwindow = document.getElementsByClassName("typecontents_signup")
   if(signwindow[0].value.length===0 || signwindow[1].value.length===0 ||signwindow[2].value.length===0 ||signwindow[3].value.length===0 ||signwindow[4].value.length===0){
      return alert("빼놓으신 폼을 입력해주세요!!!")   
   }
   if((signwindow[0].value.length!==0 && signwindow[1].value.length !==0 && signwindow[2].value.length!==0 && signwindow[3].value.length !==0 && signwindow[4].value.length !==0)&&(signwindow[2].value!== signwindow[3].value)){
      return alert("비밀번호를 확인해주세요")
   }
   data = {
       iddd : signwindow[0].value,
       name : signwindow[1].value,
       password: signwindow[2].value,
       profile: signwindow[4].value,
   } 
   function goLogin() { location.href="login.html"; }
   function nextpage1 () {alert('회원가입성공'), goLogin() }

   fetch("http://127.0.0.1:8000/signup/", {
    method: 'POST', 
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
//   .then(res=> console.log(res)) 
  .then(response=>{ 
    if(response.Result==="DoubleId"){
       return alert('이미 가입한 아이디 입니다.')
    }else{
       nextpage1()
    } 
  })
  .catch(error => alert('로그인에 문제가 발생했습니다. '));

}

let signupbtn = document.getElementsByClassName("typebutton_signup")[0]
signupbtn.addEventListener("click", signup)
