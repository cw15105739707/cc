$(()=> {
    $.ajax({
        url: 'mock/enter.json',
        dataType: 'json',
        type: 'get',
        success: function (res) {
            console.log(res);
            let list = '';
            for (let i = 0; i < res.baseInfo.length; i++) {
                list += `<div class="row">
			                  <div class="col-2 offset-2"><span>${res.baseInfo[i].title}<strong>&#42</strong></span></div>
			                  <div class="col-6"><input type="text" id="input${i}"></div>
			                  <div class="col-2"></div>
		                    </div>`

            }
            $('div.main').prepend(`<h4>基本信息</h4><hr/>${list}`);
            let list2 = '';
            for (let i = 0; i < res.cardInfo.length; i++) {
                list2 += `<div class="col-2">
				            	<span style="text-align: center">${res.cardInfo[i].title}<strong>&#42</strong></span>
					            <div class="box" id="box${i}">
					            	<input type="file" id="file${i}">
					            </div>
				             </div>
				             <div class="col-1"></div>`;
            }
            $('div.fileout').append(`<div class="col-2"></div>${list2}<div class="col-1"></div>`);
            let list3 = '';
            for (let i = 0; i < res.bankCardInfo.length; i++) {
                list3 += `<div class="row">
                              <div class="col-2 offset-2"><span>${res.bankCardInfo[i].title}<strong>&#42</strong></span></div>
                              <div class="col-6"><input type="text" id="input${i+8}"></div>
                              <div class="col-2"></div>
                            </div>`
            }
            $('div.main').append(`<h4>银行卡信息</h4><hr/>${list3}`);
        }
    });
    $('button.next').click(function () {
        let length=$('[type=text]').length;
        let length2=$('[type=file]').length;
        let length3=$('select').length;
        for(let i=0;i<length;i++){
            let text=document.getElementById(`input${i}`);
            let textVal=text.value;
            if(!textVal){
                text.style.border='1px solid red';
            }else{
                text.style.border='1px solid #898989'
            }
        }
        for(let i=0;i<length2;i++){
            let box=document.getElementById(`box${i}`);
            let file=document.getElementById(`file${i}`);
            let fileVal=file.value;
            if(!fileVal){
                box.style.border='2px dotted red';
            }else{
                box.style.border='2px dotted #898989'
            }
        }
        for(let i=0;i<length3;i++){
            let select=document.getElementById(`select${i}`);
            let selectVal=select.value;
            if(!selectVal){
                select.style.border='1px solid red'
            }
        }
        let textarea=document.getElementById('textarea');
        if(!textarea.value){
            textarea.style.border='1px solid red'
        }else {
            textarea.style.border='1px solid #898989'
        }
    });
});
