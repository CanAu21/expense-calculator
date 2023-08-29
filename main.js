const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const statusCheck = document.querySelector("#status-input")
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");


// İzleme İşlemleri
formBtn.addEventListener('click', addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

// Toplam state'i (durum)
let toplam = 0;

function updateToplam(fiyat) {
    toplam += Number(fiyat);
    toplamBilgi.innerText = toplam;
}

// Harcama Oluşturma
function addExpense(e) {
    e.preventDefault(); // Form etiketinin site özelliklerini sıfırlama
    
    // Formlar boş olma durumu
    if(!fiyatInput.value || !harcamaInput.value) {
        alert("Formları Doldurun");
        return; // fonksiyon durdurulur
    }
    
    // Div Oluşturma
    const harcamaDiv = document.createElement('div');

    // Class ekleme
    harcamaDiv.classList.add('harcama');
    // Ödendi chechbox işaretlendiğinde paid adında class ekler
    if(statusCheck.checked){
        harcamaDiv.classList.add("paid");
    }
    
    // İçeriğini Ayarlama
    harcamaDiv.innerHTML = `
          <h2>${harcamaInput.value}</h2>
          <h2 id="value" >${fiyatInput.value}</h2>
          <div class="buttons">
            <img id="payment" src="assets/payment.png" />
            <img id="remove" src="assets/remove.png" />
          </div>
           `;

    // Oluşan içeriği(harcamayı) htmle gönderme(listeye ekleme)
    liste.appendChild(harcamaDiv);

    // Toplam Harcamayı Güncelleme
    updateToplam(fiyatInput.value);

    // Formu Temizleme
    harcamaInput.value = "";
    fiyatInput.value = "";
}


// Listeye tıklanma olayı(silme)
function handleClick(e){

    // tıklanılan elemanı alma
    const element = e.target
    if(element.id === "remove") {

        // Tıklanılan sil butonunun kapsaycısının kapsayıcısını alma
        const wrapperElement = element.parentElement.parentElement;

        //Silinen elemanın fiyatını alma
        const deletedPrice = wrapperElement.querySelector("#value").innerText;
        Number(deletedPrice);
        
        //Silinenin fiyatını toplamdan çıkarma
        updateToplam( - Number(deletedPrice));

        // kapsayıcıyı htmlden kaldırma
        wrapperElement.remove();

        
    }
}

// Filtreleme İşlemi
function handleFilter(e){
    const items = liste.childNodes;

    items.forEach((item) => {
        switch (e.target.value) {
            case "all":
                item.style.display = "flex";
            break;

            case "paid":
                if (!item.classList.contains("paid")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
            break;

            case "not-paid":
                if (item.classList.contains("paid")) {
                    item.style.display = "none";
                }else{
                    item.style.display = "flex";
                }
            break;
        }
    })
}