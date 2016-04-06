function vahvistus() {

var r = confirm("Are you sure?");
    
    if(r===true) {
        
        window.location.href='new_order.html';
    }
    else
        {
           
        
            
        }
    
}





/*var teksti = function() {
    $('.btn').click(function() {
    $('<li>').text('List').appendTo('.lists');
    }
};*/



//var menu = function() {
$(document).ready(function() {
    $('.icon-menu').click(function() {
        
        $('.menu').animate( {
            right: "0px"
    }, 200);
        $('#lista').animate({
            right: "100%"
        }, 200);
    });
    $('.icon-close').click(function() {
        $('.menu').animate( {
            right: "100%"
        }, 200);
        $('#lista').animate( {
            right: "0px"
        }, 200);
    });
});
                  

    

//$(document).ready(menu);





  /*  $(document).ready(function() {
   $(window).unload(saveSettings);
    loadSettings();
});

function loadSettings() {
    
    $('#customer').val(localStorage.customer);
    $('#email').val(localStorage.email);
}

function saveSettings() {
    
    localStorage.customer = $('#customer').val();
     localStorage.email = $('#email').val();
}*/

/*function othername() {
   
    var input = [];
       /* document.getElementById('userInput').value;*/
   /* document.getElementById("userInput").innerHTML = input.valueOf();
    alert(input);
    
   
}*/
 
    
    
    


