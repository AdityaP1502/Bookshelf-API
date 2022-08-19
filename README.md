# Bookshelf-API
WebApp to track reading activities
1. API dapat menampilkan semua buku
# Kriteria
* Method : __GET__
* URL : __/books__

## Response Server
* Server harus mengembalikan response
	* status code : __200__
	* response body : 
```javascript
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```
2. API dapat menampilkan detail buku
# Kriteria
* Method : __GET__
* URL : __\books\{bookid}__

Bila buku dengan <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> yang dilampirkan pada client tidak ditemukan, maka server merespon dengan 
* Status code : __404__
* Response Body : 
```json
{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```

Bila buku dengan <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> terlampir, 
* Status code : __200__
* Response body:
```json
{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

3. API dapat menyimpan buku
# Kriteria 
## Request Client
API menyimpan buku pada route
* Method : __POST__
* URL : __/books__
* Body Request 
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

Objek buku yang disimpan pada server
```javascript
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```
### Keterangan
- <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> bernilai unik. Dapat menggunakan <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">nanoid</span>
- <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">finished</span> properti boolean yang menentukan apakah buku sudah selesai dibaca. <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">finished</span> didapatkan dari observasi <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">pageCount === readPage</span>
- <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">insertedAt</span> merupakan properti tanggal dimasukannya buku.  Dapat menggunakan method <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">Date.toISOString()</span>
- <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">updatedAt</span> merupakan properti menampung tanggal diperbarui buku. Awal masuk, sama dengan <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">insertedAt</span>

## Respon Server
Server merespon gagal jika 
* Client tidak melampirkan<span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">name</span> pada request body. Maka
	* Status Code : __400__
	* Response body
```javascript
{
	status: 'fail',
	message: "Gagal menambahkan buku. Mohon isi nama buku"
}
```
* Client melampirkan properti <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">readPage</span> yang lebih besar daripada <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">pageCount</span>
	* Status code  = __400__
	* Response body
```javascript
{
	status: 'fail',
	message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

* server gagal memasukkan buku karena alasan umum, maka server merespon dengan 
	* status code : __500__
	* response body
```json
{
    "status": "error",
    "message": "Buku gagal ditambahkan"
}
```

Bila buku berhasil ditambahkan 
* Status code __200__
* response body
```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```

4. API dapat menghapus buku
# Kriteria
Menghapus book berdasarkan <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> yang diberikan
* Method : __DELETE__
* URL : __/books/{bookid}__

Bila <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> tidak ditemukan maka
* Status code : __404__
* Response body :
```javascript
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

Bila <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> ditemukan, maka
* Status code : __200__
* Response body
```json
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```

<div align='center'>
<b>Passed Testing</b>
</div>
5. API dapat mengubah data buku
# Kriteria 
Harus mengubah data buku berdasarkan <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span>
* Method : __PUT__
* URL : __/books/{bookid}__
* Body Request : 
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

## Response Server
Server harus merespon gagal jika :
* Client tidak melampirkan<span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">name</span> pada request body. Maka
	* Status Code : __400__
	* Response body
```javascript
{
	status: 'fail',
	message: "Gagal memperbarui buku. Mohon isi nama buku"
}
```
* Client melampirkan properti <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">readPage</span> yang lebih besar daripada <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">pageCount</span>
	* Status code  = __400__
	* Response body
```javascript
{
	status: 'fail',
	message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```
* Bila <span style="padding: 2px 4px; color: rgb(175, 78, 93); background-color: rgb(30, 15, 17)">id</span> tidak dapat ditemukan
	* Status code : __404__;
	* Response body
```javascript
{
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

bila buku berhasil diperbarui
* Status code : __200__
* Response body
```json
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```


### Keterangan : Jika belum ada buku yang dimasukkan kembalikan array books kosong

<div align='center'>
<b>Passed Testing</b>
</div>
