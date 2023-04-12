# Github "İlk Katkı" Arama Programı

İstersen deneyelim! [buradan](https://first-contrib.surge.sh) !

![First Contrib App](./github.png)

## Neden Bu Proje ?

Açık kaynak kodlu projelere katkı yapmak isteyen bir yazılımcı olarak bazen beklentilerini ve yeteneklerini karşılayan doğru projeyi bulmak zor olabiliyor.

[Awesome list](https://github.com/MunGell/awesome-for-beginners) gibi bazı projeler sayesinde hala yazılımcı arayan projelerin _statik_ listesini bulabiliyoruz.

Daha da ileri giderek eğer [Github Search Engine](https://github.com/search/advanced) kullanarak yeni başlayanlar için çözülebilecek sorunlar bulmak isterseniz, yine de yeni başlayanları hedefleyen her projenin hangi etiketleri kullandığını bilmek zorundasınız.

## Cevap

Bu program, bu [dosyadaki](https://github.com/GaelS/first-contrib-app/blob/master/src/labels.js) listelenmiş _yeni başlaynlar_ ile ilgili 50 farklı etiketi kullanarak

Bu uygulama, size _yeni başlayanlar_ ile ilgili olan etiketlerle ilgili tüm sorunları hedefleyecek basit bir arama motoru sağlayarak bu sorunu yanıtlamaya çalışır. Şimdilik, bu [dosyada](https://github.com/GaelS/first-contrib-app/blob/master/src/labels.js) aşağı yukarı 50 farklı etiket listeleniyor.

Ve bir arama motoru yapmak olduğundan daha havalı olabileceğinden, bir _Miami Vice_/_GTA Vice City_ tarzı sağlamak için 80'lerimin iç titreşimlerini takip etmeye çalıştım :)

## Yol boyunca hangi sorunları buldum?

- Ağ çağrı sayısını büyük ölçüde azalttığı için Github tarafından sağlanan GraphQL API'sini kullanmak istedim. Ancak, kimlik doğrulaması olmadan çağrılamaz. Bu nedenle, bir kullanıcı olarak, bu uygulamayı kullanmak için Github'da kimliğinizin doğrulanması gerekir.

- Büyük dezavantaj: Github'da sorunları etikete göre ararken "OR" operatörünü kullanamayız. Temel olarak, bir sorguda _GOOD FIRST CONTRIBUTION_ **VEYA** _UP FOR GRBS_ etiketlerine sahip sorunu arayamayız. Bu nedenle, ilginizi çekebilecek sorunları bulmanın püf noktası, etiket listemizle eşleşen **sorunlara** sahip **havuzları** sorgulamaktır. Talihsiz sonuç, bir depoda listelenen sorunların listesinin bazen boş olabilmesidir... bu da bazen görüntülenecek hiçbir sorunu olmayan 20 depodan oluşan bir listenin alınmasına yol açar... Bu nedenle, _daha fazla getir_ düğmesi görüntülenecek yeni sorunlar bulmadan önce birkaç kez parçalanması gerekiyor...
  Benim saf bir fikrim, sıfır sorun döndürüldüğünde yeni bir havuz listesini yeniden sorgulamaktı, ancak ağ isteklerini tekrar tekrar başlatmak iyi bir fikir gibi görünmüyor... ahem...

## Kullanılar Kütüphaneler

Bu projenin ana kütüphaneleri şunlardır :

- React (ancak preact-compat daha küçük bir paket elde etmek için kullanılır)
- React Apollo
- React Router
- Biraz lodash

## Yol Haritası

Bu bir ilk taslak, bu yüzden hala yapılması gereken çok şey var.

- Stil dosylarıyla oynayabilirsiniz.
- Sıralama olasılığını artırın (şimdiye kadar, azalan yıldız sayılarına göre kodlanmıştır).
- Fonksiyonel testler (çünkü testlere her zaman ihtiyacımız var :))
- Daha önce de belirtildiği gibi, yalnızca sorunları olan anlamlı depoları sorgulamanın zarif bir yolunu elde etmek için bir numara.

PR açmaktan veya sorunları göndermekten çekinmeyin :)

## Lisans

MIT.
