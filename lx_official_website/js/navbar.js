$(()=>{
    $.ajax({
        url:'mock/navbar.json',
        dateType:'json',
        type:'get',
        success:function (res) {
            console.log(res);
            let list='';
            for(let i=0;i<res.topNavs.length;i++){
                list+=`<li class="nav-item"><a class="nav-link" href="${res.topNavs[i].url}">${res.topNavs[i].title}</a></li>`;
            }
            $('ul').html(list)
        }
    })
})
