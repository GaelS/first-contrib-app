Neden bu proje?
Açık kaynak kodlu bir projeye ilk katkısını yapmak isteyen bir kodlayıcı olarak, hem beklentilerinize hem de becerilerinize uyan doğru projeyi bulmak bazen zor olabilir.

Harika bir liste gibi bazı projeler sayesinde, geliştiricileri arayan statik proje listelerini hala bulabilirsiniz.

Daha da ileri giderek, Github Arama Motoru ile yeni başlayanlar tarafından ele alınabilecek sorunları aramak istiyorsanız, yeni başlayanları hedeflemek için her bir havuz tarafından hangi etiketin kullanıldığını bilmeniz gerekir.

Cevap
Bu uygulama, yeni başlayanlarla az çok ilgili olan etiketlerle ilgili tüm sorunları hedefleyecek basit bir arama motoru sağlayarak bu soruna cevap vermeye çalışır. Şimdilik, bu dosyada aşağı yukarı 50 farklı etiket listelenmiştir.

Ve bir arama motoru yapmak olduğundan daha havalı olabileceğinden, Miami Vice / GTA Vice City tarzı sağlamak için 80'lerin içsel titreşimlerimi takip etmeye çalıştım :)

Yol boyunca ne gibi sorunlar buldum?
Ağ çağrılarının sayısını büyük ölçüde azalttığı için Github tarafından sağlanan GraphQL API'yi kullanmak istedim. Ancak, kimliği doğrulanmadan çağrılamaz. Bu nedenle, bir kullanıcı olarak, bu uygulamayı kullanmak için Github'da kimliğinizin doğrulanması gerekir.

Büyük dezavantaj: Github'da etikete göre sorunları ararken "VEYA" operatörünü kullanamayız. Temel olarak, tek bir sorguda İLK KATKI VEYA KAVRAMALAR İÇİN İYİ ETKİLEŞTİRME etiketlerine sahip olma sorununu arayamayız. Bu nedenle, ilgi çekici olabilecek sorunları elde etmenin püf noktası, etiketler listemizle eşleşen sorunları olan depoları sorgulamaktır. Talihsiz sonuç, bir depoda listelenen sorunların listesinin bazen boş olabilmesidir ... bu da bazen görüntülenecek hiçbir sorun olmaksızın 20 depodan oluşan bir listeye yol açar ... Daha fazla getir düğmesinin nedeni budur. gösterilecek yeni sorunlar bulmadan önce birkaç kez parçalanması gerekiyor ... Benim saf bir fikrim, sıfır sayı döndürüldüğünde yeni bir depo listesini tekrar sorgulamaktı, ancak ağ isteklerini özyinelemeli olarak başlatmak iyi bir fikir gibi görünmüyor ... ahem ...

Yığın
Bu projenin ana kütüphaneleri:

Tepki verin (ancak önceden uyumluluk, daha küçük bir paket elde etmek için kullanılır)
Apollo'ya tepki ver
React Yönlendirici
Biraz zeytinyağı
YOL HARİTASI
Bu ilk taslak bu yüzden hala yapılması gereken çok şey var

Stili cilalayın
Sıralama olasılığını geliştirin (şimdiye kadar, azalan yıldız sayılarıyla kodlanmıştır).
Fonksiyonel testler (çünkü her zaman testlere ihtiyacımız var :))
Daha önce de belirtildiği gibi, yalnızca sorunları olan anlamlı depoları sorgulamanın zarif bir yolunu bulmanın bir püf noktası.
PR açmaktan veya sorun göndermekten çekinmeyin :)

LİSANS
MIT.
