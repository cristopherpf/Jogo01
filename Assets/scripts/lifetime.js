#pragma strict

var lifetime = 1.0;
 
function Awake(){
    Destroy(this.gameObject, lifetime);
}