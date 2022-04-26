//------------------------------------------------------------------------------C-165---------------------------------------------------------------------------//
//----------------------------------------------------------------Molten Steel: The Rising Behemoth----------------------------------------------------------------//
//-----------------------------------------------------------------------movment_and_sooting.js---------------------------------------------------------------//

//Registering a component to update the movment of the cmaera and to enable a shooting mechanism
AFRAME.registerComponent("update-movement-and-shoot",{

    //Schema
    schema:{
        cam_rot:{type:"string",default:"0 0 0"},
        cam_pos:{type:"string",default:"0 0 0"}
    },

    //Calling a tick function
    tick: function(){

        //Availing the positon and rotation of the camera
        camera_position=this.el.getAttribute("position")
        camera_rotation=this.el.getAttribute("rotation")
        this.data.cam_rot=camera_rotation
        this.data.cam_pos=camera_position

        //Setting the cockpit's position and y rotation value to that of the camera's
        cockpit_el=document.querySelector("#cockpit_pl")
        cockpit_el.setAttribute("position",{"x":camera_position.x,"y":camera_position.y,"z":camera_position.z})
        cockpit_el.setAttribute("rotation",{y:camera_rotation.y})

        //Creating a new vector and adding the camera's world direction to it
        var camera_obj= new THREE.Vector3()
        camera_el=document.querySelector("#camera_pl")
        camera_el.object3D.getWorldDirection(camera_obj)
    },

    //Calling an init function
    init:function(){

      //Creating a swal object for instructions
      swal({
        title:"Instructions",
        text:"Movement: WASD \n Shoot:Space (Hold) \n Task: \n Capture the beacon XAE_34 located on the other side of the city. Access to it will result in the acquisition of weapons grade lawrencium. \n \n And never forget our motto.....\n Keep on fighting until the steel melts away, and always unleash your inner behemoth in the face of defeat."
      })

      //Creating a new variable num
      var num=0

      //Adding a new event listener that is activated by a "keydown" event  
      window.addEventListener("keydown",(e)=>{

          //Assessing the keycode or key of the event  
          ////Case-1 -The keycode of the event is 32 or spacebar  
          if(e.keyCode===32){
            
            //Incrementing num by 1
            num+=1

            //Verifying whether the value of num is lesser than 10 or 0
            ////Case-1 -The value of num is lesser than 10 or 0
            if(num>10 || num===0){
                if( parseInt(this.data.cam_pos.y)<50){
                //New variable for the z position of the camera entity
                z_pos=-2.4

                //Verifying whether the y rotation value of the camera is greater than 180 degrees or not
                ////Case-1 -The y rotation value is greater than 180
                if(this.data.cam_rot.y>180){
                    z_pos=2.4
                }
                
                //Getting the vector position, rotation and position of the camera
                camera_el=document.querySelector("#camera_pl").object3D
                camera_el_pos=document.querySelector("#camera_pl").getAttribute("position")
                camera_el_rot=document.querySelector("#camera_pl").getAttribute("rotation")

                //Sourcing the scene element
                scene_el=document.querySelector("#scene_wrld")

                //Creating two new vectors ~~(ii)
                var vectors_bullet_1= new THREE.Vector3()
                var vectors_bullet_2= new THREE.Vector3()

                //Assigining the vector values of the camera to the variables in (ii)
                camera_el.getWorldDirection(vectors_bullet_1)
                camera_el.getWorldDirection(vectors_bullet_2)

                //Creating the first bullet element
                bullet_el_1=document.createElement("a-entity")

                //Assigning it the attributes requires for bullet mechanics
                bullet_el_1.setAttribute("geometry",{primitive:"sphere",radius:0.4})
                bullet_el_1.setAttribute("material",{color:"yellow"})
                bullet_el_1.setAttribute("gltf-model","#missile_player")
                bullet_el_1.setAttribute("scale","0.0002","0.0002","0.0002")
                bullet_el_1.setAttribute("rotation",{x:camera_el_rot.x-90,y:camera_el_rot.y,z:camera_el_rot.z})
                bullet_el_1.setAttribute("velocity",vectors_bullet_1.multiplyScalar(-78))
                bullet_el_1.setAttribute("position",{x:camera_el_pos.x-2.4,y:camera_el_pos.y,z:camera_el_pos.z+z_pos})
                bullet_el_1.setAttribute("dynamic-body",{mass:"0.3"})

                //Creating the second bullet element
                bullet_el_2=document.createElement("a-entity")

                //Assigning it the attributes requires for bullet mechanics                
                bullet_el_2.setAttribute("geometry",{primitive:"sphere",radius:0.4})
                bullet_el_2.setAttribute("material",{color:"yellow"})
                bullet_el_2.setAttribute("gltf-model","#missile_player")
                bullet_el_2.setAttribute("scale","0.0002","0.0002","0.0002")
                bullet_el_2.setAttribute("rotation",{x:camera_el_rot.x-90,y:camera_el_rot.y,z:camera_el_rot.z})
                bullet_el_2.setAttribute("velocity",vectors_bullet_2.multiplyScalar(-78))
                bullet_el_2.setAttribute("position",{x:camera_el_pos.x+2.4,y:camera_el_pos.y,z:camera_el_pos.z+z_pos})
                bullet_el_2.setAttribute("dynamic-body",{mass:"0.3"})

                //Appending both the bullets to the scene element
                scene_el.appendChild(bullet_el_1)
                scene_el.appendChild(bullet_el_2)

                //Sourcing the sound element for shooting and activating its audio
                sound_el_shooting=document.querySelector("#shooting_pl")
                sound_el_shooting.components.sound.playSound()

                //Adding a "collide" event listener for the first bullet element
                bullet_el_1.addEventListener("collide",(e)=>{

                    //Verifying whether the target body of the collision is an opponent
                    //The target bodt of the collision is an opponent
                    if(e.detail.body.el.id.includes("opp")){
                           
                        //Sourcing the health bar element and availing its width attribute
                        health_bar_el=document.querySelector("#health_bar_opp")
                        health_bar_el_width=health_bar_el.getAttribute("width")

                        //Removing the bullet element
                        bullet_el_1.remove()

                            //Verifying whether the width of the health bar is greater than 0 or not 
                            ////Case-1 -The health bar'width is greater than 0
                            if(health_bar_el_width>0){

                                //Reducing the type-converted health bar by 0.6 and setting the new values to the corresponding element
                                health_bar_el_width=parseFloat(health_bar_el_width)-0.6
                                health_bar_el.setAttribute("width",health_bar_el_width)
                            }

                            ////Case-2 (else)
                            else{

                                //Removing the target body
                                e.detail.body.el.remove()

                                //Creating two consecutive swal elements so that upon accidental closure, another one can arrive as backup
                                swal({
                                        title:"Succesful",
                                        icon:"success",
                                        text:"Great Job! Now move straight towards the beacon! North of you!"
                                    }).then(()=>{
                                        swal({
                                            title:"Succesful",
                                            icon:"success",
                                            text:"Great Job! Now move straight towards the beacon! North of you!"
                                        })
                                    })
                            } 
                        }
                    })

                    //Adding a "collide" event listener for the second bullet element
                    bullet_el_2.addEventListener("collide",(e)=>{

                        //Verifying whether the target body of the collision is an opponent
                        //The target bodt of the collision is an opponent
                        if(e.detail.body.el.id.includes("opp")){
                            
                            //Sourcing the health bar element and availing its width attribute
                            health_bar_el=document.querySelector("#health_bar_opp")
                            health_bar_el_width=health_bar_el.getAttribute("width")

                            //Removing the bullet element
                            bullet_el_2.remove()

                                //Verifying whether the width of the health bar is greater than 0 or not 
                                ////Case-1 -The health bar'width is greater than 0
                                if(health_bar_el_width>0){

                                    //Reducing the type-converted health bar by 0.6 and setting the new values to the corresponding element
                                    health_bar_el_width=parseFloat(health_bar_el_width)-0.6
                                    health_bar_el.setAttribute("width",health_bar_el_width)
                                }
    
                                ////Case-2 (else)
                                else{

                                    //Removing the target body
                                    e.detail.body.el.remove()

                                    //Creating two consecutive swal elements so that upon accidental closure, another one can arrive as backup
                                    swal({
                                        title:"Succesful",
                                        icon:"success",
                                        text:"Great Job! Now move straight towards the beacon! North of you!"
                                    }).then(()=>{
                                        swal({
                                            title:"Succesful",
                                            icon:"success",
                                            text:"Great Job! Now move straight towards the beacon! North of you!"
                                        })
                                    }) 
                                } 
                            }
                        })    
                
                //Setting the num value to zero
                num=0 
                }
            }

            ////Case-2 -The key is either one of the WASD Controls or the Arrow Keys
            if(e.key==="ArrowLeft"||e.key==="ArrowRight"||e.key==="ArrowUp"||e.key==="ArrowDown"||e.key==="w"||e.key==="a"||e.key==="s"||e.key==="d"){

                //Sourcing the sound element for walking and activating its audio
                sound_el_walking=document.querySelector("#walking_pl")
                sound_el_walking.components.sound.playSound()
            } 
          }
      })
    },
})

//-----------------------------------------------------------------------movment_and_sooting.js---------------------------------------------------------------//
//----------------------------------------------------------------Molten Steel: The Rising Behemoth----------------------------------------------------------------//
//-----------------------------------------------------------------------------C-165---------------------------------------------------------------------------//
