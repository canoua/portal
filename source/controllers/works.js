export async function mainPage(req, res) {
  res.render("main", {
    title: "Главная",
  });
}

export function errorPage(req, res) {
  res.status(404);
  res.render("404", {
    title: "Ошибка",
  });
}
