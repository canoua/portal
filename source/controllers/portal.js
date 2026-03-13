export function mainPage(req, res) {
  res.render('main', {
    title: 'Главная'
  });
}

export function signinPage(req, res) {
  res.render('signin', {
    title: 'Вход'
  })
}

export function signupPage(req, res) {
  res.render('signup', {
    title: 'Регистрация'
  })
}

function errorPage(req, res) {
  res.status(404);
  res.render('404', {
    title: 'Ошибка'
  })
}