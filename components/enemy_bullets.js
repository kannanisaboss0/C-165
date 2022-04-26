//------------------------------------------------------------------------------C-165---------------------------------------------------------------------------//
//----------------------------------------------------------------Molten Steel: The Rising Behemoth----------------------------------------------------------------//
//-------------------------------------------------------------------------enemy_bullets.js---------------------------------------------------------------//

AFRAME.registerComponent("enemy-shoot",{

    //Schema
    schema:{},

    //Calling an init function
    init:function(){

        //Setting an interval for every two seconds
        setInterval(()=>{

            //Sourcing the camera element and subsequently its y position
            camera_el=document.querySelector("#camera_pl")
            camera_pos_y=camera_el.getAttribute("position").y

            //Verifying whether type-converted y position value of the camera is lesser than 50
            ////Case-1 -The y value of the camera is lesser than 50
            if(parseInt(camera_pos_y)<50){

                //Creating two bullet entities for the enemy
                enemy_bullet_1=document.createElement("a-entity")
                enemy_bullet_2=document.createElement("a-entity")

                //Setting the position attributes of both the bullets
                enemy_bullet_1.setAttribute("position","-0.65 3.3 0")
                enemy_bullet_2.setAttribute("position","0.65 3.3 0")

                //Setting the geometry attribute of both the bullets
                enemy_bullet_1.setAttribute("geometry",{primitive:"sphere",radius:0.2})
                enemy_bullet_2.setAttribute("geometry",{primitive:"sphere",radius:0.2})

                //Setting the rotation attributes of both the bullets
                enemy_bullet_1.setAttribute("rotation","0 90 90")
                enemy_bullet_2.setAttribute("rotation","0 90 90")

                //Setting the material attributes of both the bullets
                enemy_bullet_1.setAttribute("material",{color:"black"})
                enemy_bullet_2.setAttribute("material",{color:"black"})


                //Creating a new vector and setting the the camera element's world position to it
                camera_el_vec=new THREE.Vector3()
                camera_el_obj=document.querySelector("#camera_pl").object3D
                camera_el_obj.getWorldPosition(camera_el_vec)

                //Creating a new vector and setting the the enemy element's world position to it
                enemy_el_vec=new THREE.Vector3()
                enemy_el_obj=this.el.object3D
                enemy_el_obj.getWorldPosition(enemy_el_vec)

                //Creating the dreiction subvector for the first bullet ~~(i)
                direction1= new THREE.Vector3()
                direction1.subVectors(camera_el_vec,enemy_el_vec)

                //Creating the dreiction subvector for the second bullet ~~(ii)
                direction2=new THREE.Vector3()
                direction2.subVectors(camera_el_vec,enemy_el_vec)

                //Setting the velocity attributes of both the bullets with the value beng the respective subvectors from (i) and (ii)
                enemy_bullet_1.setAttribute("velocity",{x:direction1.multiplyScalar(1).x,y:0,z:direction1.multiplyScalar(1).z})
                enemy_bullet_2.setAttribute("velocity",{x:direction1.multiplyScalar(1).x,y:0,z:direction1.multiplyScalar(1).z})

                //Making both bullets a dynamic body, however, with nil mass
                enemy_bullet_1.setAttribute("dynamic-body",{shape:"sphere",mass:0})
                enemy_bullet_2.setAttribute("dynamic-body",{shape:"sphere",mass:0})

                //Sourcing the scene elements and appending both the bullets as children to it
                scene_el=document.querySelector("#scene_wrld")
                this.el.appendChild(enemy_bullet_1)
                this.el.appendChild(enemy_bullet_2)

                //Adding a "collide" event listener to the first bullet
                enemy_bullet_1.addEventListener("collide",(e)=>{
                
                    //Verifying whether the target of collision is the camera (player) element
                    ////Case-1 -The target of collision is the camera element
                    if(e.detail.body.el.id==="camera_pl"){

                        //Sourcing the health bar element and availing its width attribute
                        health_el=document.querySelector("#health_bar")
                        health_el_width=health_el.getAttribute("width")

                        //Assessing the varous values of the health bar width attribute
                        ////Case-1 -The type-converted width value is greater than 0.02
                        if(parseFloat(health_el_width)>0.02){

                            //Reducing the width value by 0.02
                            health_el_width=parseFloat(health_el_width)-0.02

                        ////Case-2 -The type-converted width value is lesser than 0.4   
                        if(health_el_width<0.4){

                            //Changing the color of the health bar to yellow indicate half health
                            health_el.setAttribute("color","yellow")
                        }

                        ////Case-3 -The type-converted width value is lesser than 0.2
                        if(health_el_width<0.2){
                            //Changing the color of the health bar to red indicate low health
                            health_el.setAttribute("color","red")
                        }
                        //Setting the new width values to the health bar and removing the enemy bullet
                        health_el.setAttribute("width",health_el_width)
                        enemy_bullet_1.remove()
                        }

                        ////Case-4 (else)
                        else{

                            //Setting the velocity atttrbiute of the target body, to launch it off the ground
                            e.detail.body.el.setAttribute("velocity","0 150 0")

                            //Selecting the all the elements within the weapon shooter class
                            weapon_shooter_class=document.querySelectorAll(".weapon_pl")

                            //Running a for loop over the elements of the class
                            for(weapon_el of weapon_shooter_class){

                                //Destroying the iterated element in question
                                weapon_el.remove()
                            }

                            //Selecting the the cockpit element and making it invisible
                            cockpit_el=document.querySelector("#cockpit_pl")
                            cockpit_el.setAttribute("visible","false")
                    } 
                }
            })

                //Adding a "collide" event listener to the second bullet
                enemy_bullet_2.addEventListener("collide",(e)=>{
                    
                    //Verifying whether the target of collision is the camera (player) element
                    ////Case-1 -The target of collision is the camera element
                    if(e.detail.body.el.id==="camera_pl"){

                        //Sourcing the health bar element and availing its width attribute
                        health_el=document.querySelector("#health_bar")
                        health_el_width=health_el.getAttribute("width")

                        //Assessing the varous values of the health bar width attribute
                        ////Case-1 -The type-converted width value is greater than 0.02
                        if(parseFloat(health_el_width)>0.02){

                            //Reducing the width value by 0.02
                            health_el_width=parseFloat(health_el_width)-0.02

                        ////Case-2 -The type-converted width value is lesser than 0.4   
                        if(health_el_width<0.4){

                            //Changing the color of the health bar to yellow indicate half health
                            health_el.setAttribute("color","yellow")
                        }

                        ////Case-3 -The type-converted width value is lesser than 0.2
                        if(health_el_width<0.2){

                            //Changing the color of the health bar to red indicate low health
                            health_el.setAttribute("color","red")
                        }

                        //Setting the new width values to the health bar and removing the enemy bullet
                        health_el.setAttribute("width",health_el_width)
                        enemy_bullet_2.remove()
                        }

                        ////Case-4 (else)
                        else{
                            //Setting the velocity atttrbiute of the target body, to launch it off the ground
                            e.detail.body.el.setAttribute("velocity","0 150 0")

                            //Selecting the all the elements within the weapon shooter class
                            weapon_shooter_class=document.querySelectorAll(".weapon_pl")

                            //Running a for loop over the elements of the class
                            for(weapon_el of weapon_shooter_class){

                                //Destroying the iterated element in question
                                weapon_el.remove()
                            }

                            //Selecting the the cockpit element and making it invisible
                            cockpit_el=document.querySelector("#cockpit_pl")
                            cockpit_el.setAttribute("visible","false")
                    } 
                }
            })
            }
        },2000)
    }
})

//-------------------------------------------------------------------------enemy_bullets.js---------------------------------------------------------------//
//----------------------------------------------------------------Molten Steel: The Rising Behemoth----------------------------------------------------------------//
//------------------------------------------------------------------------------C-165---------------------------------------------------------------------------//