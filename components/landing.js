//---------------------------------------------------------------------------C-165---------------------------------------------------------------------------//
//----------------------------------------------------------------Molten Steel: The Rising Behemoth----------------------------------------------------------------//
//-------------------------------------------------------------------------landing.js---------------------------------------------------------------//

//Registering a component to handle all lanidng related activities
AFRAME.registerComponent("landing-handler",{

    //Schema
    schema:{
        score:{type:"number",default:90000}
    },

    //Calling a tick function
    tick: function(){
        
        //Availing the frame-by-frame positions of the camera and city
        camera_el_pos=document.querySelector("#camera_pl").getAttribute("position")
        city_el_pos=document.querySelector("#map_env").getAttribute("position")

        //Finding the difference between their positions ~~(i)
        difference_alt=((parseInt(camera_el_pos.y)-parseInt(city_el_pos.y))-3)

        //Sourcing the text element for altitude and updating it accordingly
        text_el=document.querySelector("#altitude_tx")
        text_el.setAttribute("text",{value:`${difference_alt} m`})

        //Assessing the value of the altitude gained in (i)
        ////Case-1 -The difference is lesser than 100
        if(difference_alt<100){
            text_el.setAttribute("text",{value:`${difference_alt} m`,color:'red'})
        }

        ////Case-2 -The difference is lesser than 500 and greater than 100
        if(difference_alt<500 && difference_alt>100 ){
            text_el.setAttribute("text",{value:`${difference_alt} m`,color:'orange'})
        }

        //Verifying whether the y position of the camera is greater than 1500 or not
        ////Case-1 -The y position of the camera is greater than 1500 
        if(camera_el_pos.y>1500){

            //Sourcing the text element to indicate loss and making it visible
            lost_text_el=document.querySelector("#loss_tx")
            lost_text_el.setAttribute("visible","true")
        }

        //Verifying whether the z position of the camera is lesser than -200 or not
        ////Case-1 -The y position of the camera is lesser than -200
        if(camera_el_pos.z<-200){

            //Displaying a swal object indicating victory
            swal({
                title:"Mission Accomplished",
                icon:"success",
                text:"Beacon captured! The mission is over! Commander, you may return to the nearest SpaceTech Colony at 31.345 N, 56.2343 E to claim your payment. The top brass will scrutinize you for a promotion, after all, you have secured a vital checkpoint for the colony."
            }) 
        }   
    }
})

//----------------------------------------------------------------Molten Steel: The Rising Behemoth----------------------------------------------------------------//
//-------------------------------------------------------------------------landing.js---------------------------------------------------------------//
//---------------------------------------------------------------------------C-165---------------------------------------------------------------------------//