# WEB Practice 2020 EPAM 

Веб-приложение для записи аудиосообщений и прослушивания существующих, хранящихся на сервере. 

Адаптировано под мобильную версию. 

Используется библиотека Socket.IO для работы приложения в реальном времени. 

Принцип работы приложения базируется на использовании пользователем одного из 3 режимов работы, а именно следующих: «voices list» соответствующий кнопке «All voices», «speaker-mode» под кнопкой «Microphone» и «listener-mode» с кнопкой «Stream».

Выбирая режим «voices list» пользователь получает все аудиосообщения, находящиеся на сервере. Каждое из этих сообщений можно прослушать, нажав на кнопку play. Режим «speaker-mode» позволяет записать пользователю аудиосообщение. Нажав на кнопку один раз, начинается запись сообщения в режиме реального времени, повторное нажатие завершает запись аудиосообщения и автоматически отправляет его на сервер. Третий режим «listener-mode» позволяет постоянно прослушивать эфир, т.е. происходит реакция на приходящие аудиосообщения от сервера, и они сразу же воспроизводятся.

При написании клиентской части использовался уже готовый сервер для отправки и получения сообщений.

На заключительном этапе создавался собственный сервер, с которым бы связывался клиент.

Работа сервера заключается в ответах на get-запросы, а именно «/» отдает клиента, а «/voices» отдает массив сообщений. Также сервер реагирует на такие события как connection, disconnect и audioMessage. В случае события connection необходимо увеличить количество пользователей на единицу и разослать всем событие «user» с количеством подключенных пользователей. Подсчет количества пользователей достигается с помощью применения метода socket.client.conn.server.clientsCount. Аналогично для disconnect уменьшается число пользователей на единицу и также рассылается событие. Последнее событие audioMessage означает, что полученное сообщение добавляется в массив voices с помощью метода push и затем рассылается всем пользователям событие audioMessage с этим сообщением (io.emit("audioMessage", audio)).
