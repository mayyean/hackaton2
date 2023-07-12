// Тех.задание;
// Общее описание проекта: Проект представляет из себя имитацию соц. сети с возможностью регистрации, авторизации и отправки сообщений другим пользователям

// Детальное описание проекта: Весь проект можно разделить на 2 большие подзадачи:

// 1. Логика регистрации и авторизации
// Детальное описание подзадачи: Пользователь должен иметь возможность регистрироваться на сайте(имя пользователя всегда должно быть уникальным), также должна быть возможность авторизоваться на сайте(все последующие операции возможны только если пользователь авторизован), должна быть возможность удалить свой профиль, для этого пользователь должен быть авторизован и при удалении необходимо запросить пароль для подтверждения, после подтверждения аккаунт нужно удалить

// Примерный вид объекта пользователя(ваш вариант может отличаться):
// {
// name: '', //имя пользователя
// password: '', //пароль от аккаунта
// age: '', //возраст пользователя
// isLogin: false, //авторизован/неавторизован
// getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
// sendMessages: [] //отправленные сообщения(которые будет отправлять сам пользователь)
// }

let users = [
  {
    name: "user1", //имя пользователя
    password: "user1", //пароль от аккаунта
    age: 23, //возраст пользователя
    isLogin: false, //авторизован/неавторизован
    getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
    sendMessages: [], //отправленные сообщения(которые будет отправлять сам пользователь)
  },
  {
    name: "user2", //имя пользователя
    password: "user2", //пароль от аккаунта
    age: 23, //возраст пользователя
    isLogin: false, //авторизован/неавторизован
    getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
    sendMessages: [], //отправленные сообщения(которые будет отправлять сам пользователь)
  },
  {
    name: "user3", //имя пользователя
    password: "user3", //пароль от аккаунта
    age: 23, //возраст пользователя
    isLogin: false, //авторизован/неавторизован
    getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
    sendMessages: [], //отправленные сообщения(которые будет отправлять сам пользователь)
  },
];

function checkUserName(userName) {
  return users.some((item) => item.name === userName);
}

function checkPassword(password, passwordConfirm) {
  return password === passwordConfirm;
}

function registerUser() {
  let userName = prompt("Please enter your name");
  if (checkUserName(userName)) {
    alert("This user is already exists. Please choose other name");
    return;
  }
  let password = prompt("Please enter your password");
  let passwordConfirm = prompt("Please confirn your password");
  if (!checkPassword(password, passwordConfirm)) {
    alert("Password don/t match");
    return;
  }
  let userAge = +prompt("Please enter your age");
  let userObj = {
    name: userName,
    password: password,
    age: userAge,
    isLogin: false,
    getMessages: [],
    sendMessages: [],
  };
  users.push(userObj);
  console.log(users);
}

//! login logic

let inSystem = "";

function changeInSyst(userName = "") {
  inSystem = userName;
  let h3 = document.querySelector("h3");
  inSystem
    ? (h3.innerText = `User: ${inSystem} in system`)
    : (h3.innerText = "No users in system");
}

function getUserObj(userName) {
  return users.find((item) => item.name === userName);
}

function checkUserPassword(userName, password) {
  let user = getUserObj(userName);
  return user.password === password;
}

function loginUser() {
  let userName = prompt("Enter username");
  if (!checkUserName(userName)) {
    alert("User wasn't found");
    return;
  }
  let pass = prompt("please, enter your password");
  if (!checkUserPassword(userName, pass)) {
    alert("Password doesn't match this account!");
    return;
  }
  let user = getUserObj(userName);
  user.isLogin = true;
  changeInSyst(userName);
  console.log(users);
}

//! logout logic

function logOut() {
  if (!inSystem) {
    alert("Only authorized users can logout!");
    return;
  }
  let user = getUserObj(inSystem);
  user.isLogin = false;
  changeInSyst();
}

//! delete logic

function deleteAcc() {
  if (!inSystem) {
    alert("Only authorized user can log out");
    return;
  }
  let user = getUserObj(inSystem);
  let username = prompt("Enter your username");
  let password = prompt("Enter the password ");
  let del = users.findIndex((item) => item.name === user.name);
  if (del !== -1) {
    if (user.password !== password) {
      alert("Password is incorrect");
      return;
    }
    users.splice(del, 1);
  }
  console.log(users);
  changeInSyst();
}

// 2. Логика отправки/удаления сообщений
// Детальное описание подзадачи: Каждый юзер должен иметь возможность отправлять сообщения, у каждого пользователя есть 2 ключа, в одном хранятся сообщения, которые отправил пользователь, в другом, сообщения, которые отправили пользователю, для отправки сообщения юзер должен быть авторизован

// Cам объект сообщений может выглядеть след. образом(ваш вариант может отличаться):
// {
// id: Number, //уникальный номер сообщения
// content: '', //содержимое сообщения
// from: User 1 //пользователь, который отправил сообщение
// }
// Когда пользователь 1 отправляет сообщение пользователю 2, необходимо ззапросить имя того пользователя, которому нужно отправить сообщение, у первого сообщение сохраняется в отправленных, а у второго в принятых, сообщения можно удалять, их может удалить либо пользователь которому отправили сообщения, либо тот кто отправил сообщение

//! send / get message

function sendMessage() {
  if (!inSystem) {
    alert("Only authorized user can send message");
    return;
  }
  let user = prompt(
    "Please enter name of the person who do you want to send message to"
  );
  if (!checkUserName(user)) {
    alert("User not found in system");
    return;
  }
  let title = prompt("Write message");
  let send = {
    id: Date.now(),
    message: title,
    to: user,
  };
  let get = {
    id: Date.now(),
    message: title,
    to: inSystem,
  };
  let getter = getUserObj(user);
  let sender = getUserObj(inSystem);
  sender.sendMessages.push(send);
  getter.getMessages.push(get);
}

//! delete message logic

// function deleteMessage(id) {
//   let sendIndex = users.sendMessages.findIndex((message) => message.id === id);
//   let getIndex = users.getMessages.findIndex((message) => message.id === id);

//   if (sendIndex !== -1) {
//     users.sendMessages.splice(sendIndex, 1);
//     alert("Message was deleted from sent messages");
//   } else if (getIndex !== -1) {
//     users.getMessages.splice(getIndex, 1);
//     alert("Message was deleted from received messages");
//   } else {
//     alert("Message not found");
//   }
// }

// Пример использования с промптами

// После завершения таска отправить код в гитхаб и в классрум прикрепить ссылку на репозиторий

// Будет плюсом:
// Добавить минимальный интерфейс(кнопки в HTML и вывод юзернейма авторизованного пользователя), подключить github Pages, ссылку также прикрепить в гитхаб
