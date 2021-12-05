const Twit=require('twit');
const axios=require('axios');
const config=require('./config');
const num=require('number-to-emoji');
const T =new Twit(config);
let currentFollowercount;
const getFollowerCount=()=>{
    const params={
        screen_name:'tcsr9999'
    }
    T.get('users/show',params,(err,data,response)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
            currentFollowercount=data.followers_count;
            const displayName=data.name;
            console.log(displayName)
            const followercount= displayName.match(/\d/g).join('');
            console.log(followercount)
            //console.log(followercount);
            if(currentFollowercount!==followercount){
                currentFollowercount=num.toEmoji(currentFollowercount);
                updateDisplayName();
            }
            //updateDisplayame();
        }
    })
}
setInterval(getFollowerCount,2000)
//setInterval(getFollowerCount,1000);
//getFollowerCount();

const updateDisplayName=()=>{
    const params={
        name:`Chanda|${currentFollowercount} Followers`
    }
    T.post('account/update_profile',params,(err,data,response)=>{
        if(err){
            console.log(err);
        }else{
            console.log('display name updated');
        }
    })
}

console.log('server is started');