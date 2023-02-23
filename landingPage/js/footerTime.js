const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

(function getTime() {
    const date_div = document.querySelector('footer .today_date');
    const copyright_year = document.querySelector('footer .copyright .year');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    date_div.textContent = `${dd} ${months[mm-1]}`;
    copyright_year.textContent = `${yyyy}`;
})();