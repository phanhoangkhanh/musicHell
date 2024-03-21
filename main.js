{

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progess = $('#progress')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const audio = $('#audio')
const nextBtn  = $('.btn-next')
const prevBtn  = $('.btn-prev')
const ranBtn  = $('.btn-random')
const playlist = $('.playlist')

const app= {
    currentIndex : 0,
    isPlaying : false,
    isRandom : false,
    songs: [
        {
          name: "Em ve tinh khôi",
          singer: "Trần Thu Hà",
          path: './assets/EmVeTinhKhoi-TranThuHa-6853100.mp3',
          image: "https://thieuhoa.com.vn/wp-content/uploads/2023/11/PGykbsAstnNpi1lKbE11xZkwKSur0ysHJC2Yl3of.webp"
        },
        {
          name: "KHi giac mo ve",
          singer: "Phương Thanh",
          path: "./assets/KhiGiacMoVe-PhuongThanh_3twhh.mp3",
          image:
            "https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/138644/Originals/The%20Pianist%20%E2%80%93%20Ngh%E1%BB%87%20S%C4%A9%20D%C6%B0%C6%A1ng%20C%E1%BA%A7m%20(2002).jpeg"
        },
        {
          name: "Tuoi Đá Buồn",
          singer: "Hồng Nhung",
          path:
            "./assets/TuoiDaBuon-HongNhung-648726.mp3",
          image: "https://stthay.net/sites/default/files/field/image/ac_14.jpg"
        },
        {
          name: "Chuyện Rằng",
          singer: "Thịnh Suy",
          path:
            "./assets/Chuyen-Rang-Thinh-Suy.mp3",
          image: "https://vcdn-giadinh.vnecdn.net/2022/08/18/H9-9473-1660829591.jpg"
        },
        {
          name: "Dĩ Vãng Nhạt Nhòa",
          singer: "Lân Nhã",
          path:
            "./assets/DiVangNhatNhoa-LanNha-5216276.mp3",
          image: "https://vnpay.vn/s1/statics.vnpay.vn/2023/11/0w3osljbsowf1698809392074.jpg"
        },
        {
          name: "Tuổi Đời Mênh Mông",
          singer: "Hồng Nhung",
          path:
            "./assets/TuoiDoiMenhMong-HongNhung_3gnvv.mp3",
          image: "https://stthay.net/sites/default/files/field/image/ac_14.jpg"
        },
        {
          name: "KHi giac mo ve",
          singer: "Phương Thanh",
          path: "./assets/KhiGiacMoVe-PhuongThanh_3twhh.mp3",
          image:
            "https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/138644/Originals/The%20Pianist%20%E2%80%93%20Ngh%E1%BB%87%20S%C4%A9%20D%C6%B0%C6%A1ng%20C%E1%BA%A7m%20(2002).jpeg"
        },
        {
          name: "Tuoi Đá Buồn",
          singer: "Hồng Nhung",
          path:
            "./assets/TuoiDaBuon-HongNhung-648726.mp3",
          image: "https://stthay.net/sites/default/files/field/image/ac_14.jpg"
        },
        {
          name: "Chuyện Rằng",
          singer: "Thịnh Suy",
          path:
            "./assets/Chuyen-Rang-Thinh-Suy.mp3",
          image: "https://vcdn-giadinh.vnecdn.net/2022/08/18/H9-9473-1660829591.jpg"
        },

      ],

    render: function(){
      const html = this.songs.map(function(song, index){
          return `
          <div class="song ${index === app.currentIndex ? 'active' : ''}"
            data-index="${index}"
          >
              <div class="thumb" style="background-image: url('${song.image}');">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class=""author>${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
          `
      })
      $('.playlist').innerHTML = html.join('') // chuyển array -> string dài
    },
      defineProperties: function(){
        // gắn thêm 1 thuoc tính cho this app là currentSong
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
      },
      loadCurrentSong: function(){

        //console.log(this.songs)
        heading.textContent = this.currentSong.name
        thumb.style.backgroundImage =  `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

      },

      handleEvents: function(){
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        // xử lý phóng to nhỏ
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            //console.log(scrollTop)  -- lay vi tri cuốn
            const newCdWidth = cdWidth - scrollTop
            // phong Th kéo nhanh quá về âm
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }

        //xử lý nút play + pause
        playBtn.onclick = function(){
            // có thể dùng audio.onpause hoăc onplay để if
            if( !app.isPlaying ){
                audio.play()
                player.classList.add('playing')
                // ko dùng this - vì this chính là playBtn 
                app.isPlaying = true
                animationCD.play()
            }else{
                audio.pause()
                app.isPlaying = false
                player.classList.remove('playing')
                animationCD.pause()
            }
        }
        
        //Khi tiến độ bài hát thay đổi - dùng event ontimeupdate de listen sư thay đoi dần
        audio.ontimeupdate = function(){
            const progessPercent = Math.floor(audio.currentTime/audio.duration * 100)
            progess.value = progessPercent
        }

        //Xử lý khi tua - chon
        progess.onchange = function(e){
            audio.currentTime = e.target.value/ 100 * audio.duration
        }

        //Xử lý đĩa CD quay + dừng
        // có 1 event lạ là animate
        const animationCD = thumb.animate([
            {transform:'rotate(360deg'}
        ], {
            duration: 10000,
            iterations: Infinity // so lần lap lai - vo hạn
        })
        animationCD.pause()

        //Xử lý nút next - prev
        nextBtn.onclick = function(){
            app.nextSong()
            audio.play()
            //render lai để active list hát dưới - chỉ mục list bài hát
            app.render()
        }
        prevBtn.onclick = function(){
            app.prevSong()
            audio.play()
            //render lai để active list hát dưới - chỉ mục list bài hát
            app.render()
        }

        //Xử lý nút Random
        ranBtn.onclick =  function(e){
            // ơ day thay vì dùng e - thì choi lun nút ranBtn
            ranBtn.classList.toggle('active')
            app.isRandom = !app.isRandom
            app.playRanDomSong()
            audio.play()
        }

        //Xử lý next Song khi audio end
        audio.onended = function(){
          app.nextSong()
          audio.play()
        }

        //Xử lý chon list bài hát thì hát bài đó
        playlist.onclick = function(e){
          // xử lý vùng click vào
          //closest để khi e bắt obj con thì cũng tính là cha trưc hệ - có class song
          //closest loai thằng nào có active
          console.log([e.target.closest])
          if( e.target.closest('.song:not(.active)') || e.target.closest('.option')){
            if(e.target.closest('.song:not(.active)') ){
              const songNode = e.target.closest('.song:not(.active)')
              //console.log( songNode.getAttribute('data-index') )
              // nhớ ép kiểu số vì getAtribute ra dạng text
              app.currentIndex = Number( songNode.getAttribute('data-index') )
              app.loadCurrentSong()
              // render lai mục list bài hát
              app.render()
              audio.play()
            }
          }
        }
      },

      playRanDomSong: function(){
        const newIndex = Math.floor(Math.random()*this.songs.length)
        if( this.currentIndex == newIndex ) {
            this.currentIndex++
        }else{
            this.currentIndex = newIndex
        }
        this.loadCurrentSong()
      },

      nextSong: function(){
        if( this.currentIndex < this.songs.length -1){
            this.currentIndex++
        }else{
            this.currentIndex = 0
        }
        //console.log(this.currentIndex)
        this.loadCurrentSong()
      },

      prevSong : function(){
        this.currentIndex--
        if( this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
      },

      start: function(){
        // đinh nghĩa thuoc tính cho obj
        this.defineProperties()
        app.loadCurrentSong()
        // xử lý DOM event
        this.handleEvents()
        // render ra
        this.render()
      }
}



//LÝ THUYẾT CHỦ ĐẠO PHÁT TRIỂN

//HÃY NGHĨ VE 1 DOI TUONG DUY NHẤT

// 1- tất cả nhét vào 1 obj
// 2- tách phần handleEvent riêng ra phần chức năng thực thi
// 3- tạo ra 1 function render lại các phần html cần thay đổi
// 4- e.target có thể bắt những DOM con - 
//      nên dùng closest với query tên class cần để bắt lên Element cha
// 5- Hạn chế dùng vng lặp với DOM element - nen tìm querySelector với class






// logic biến 1 biến app thành nơi vn hành tất cả
app.start()
}