import { useState, useEffect, useRef } from "react";



// ── palette ──────────────────────────────────────────────────────────────────
const pk="#f72585", pu="#7209b7", bl="#4cc9f0", gr="#06d6a0", am="#ffd166";

// ── shared styles ─────────────────────────────────────────────────────────────
const FF = "'Outfit',system-ui,sans-serif";
const inp = {
  width:"100%",padding:"13px 16px",background:"rgba(255,255,255,0.07)",
  border:"1px solid rgba(255,255,255,0.14)",borderRadius:12,color:"#e8e8ff",
  fontSize:15,outline:"none",boxSizing:"border-box",fontFamily:FF,transition:"border-color 0.2s",
};
const card = {
  background:"rgba(255,255,255,0.055)",border:"1px solid rgba(255,255,255,0.1)",
  borderRadius:16,padding:"16px 20px",
};
const btn=(bg=pk,outline=false)=>({
  width:"100%",padding:"14px 20px",
  background:outline?"transparent":`linear-gradient(135deg,${bg},${bg}bb)`,
  border:outline?"1px solid rgba(255,255,255,0.15)":"none",
  borderRadius:12,color:outline?"rgba(255,255,255,0.55)":"#fff",
  fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:FF,
  transition:"opacity 0.2s,transform 0.1s",letterSpacing:0.3,
});
const pill=(active,color=pk)=>({
  padding:"7px 14px",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:500,
  border:`1.5px solid ${active?color+"80":"rgba(255,255,255,0.1)"}`,
  background:active?`${color}18`:"rgba(255,255,255,0.04)",
  color:active?"#e8e8ff":"rgba(255,255,255,0.45)",
  transition:"all 0.18s",whiteSpace:"nowrap",
});

// ── constants ─────────────────────────────────────────────────────────────────
const COLLEGES={
  Punjab:   ["Panjab University Chandigarh","IIT Ropar","Thapar Institute","Lovely Professional University","Chitkara University","GNDU Amritsar","Punjab Engineering College","DAV College Chandigarh","Chandigarh University Mohali","NIT Jalandhar"],
  Himachal: ["NIT Hamirpur","IIT Mandi","HP University Shimla","HPTU Hamirpur","Jaypee University Solan","Shoolini University"],
  Jammu:    ["University of Jammu","NIT Srinagar","University of Kashmir","SMVDU Katra","Cluster University Jammu","IUST Awantipora"],
  Delhi:    ["Delhi University","IIT Delhi","JNU Delhi","DTU Delhi","NSUT Delhi","Jamia Millia Islamia","IP University Delhi","AIIMS Delhi"],
  Haryana:  ["NIT Kurukshetra","KUK Kurukshetra","MDU Rohtak","Ashoka University","Shiv Nadar University","YMCA Faridabad","Amity Gurugram"],
};
const ADMIN={email:"akshit8894@gmail.com",password:"Akshit@2710"};

const COLLEGE_DOMAINS={
  // ── Punjab ─────────────────────────────────────────────────────────────────
  "Panjab University Chandigarh":   ["puchd.ac.in","pu.ac.in"],
  "IIT Ropar":                       ["iitrpr.ac.in"],
  "Thapar Institute":                ["thapar.edu"],
  "Lovely Professional University":  ["lpu.in"],
  "Chitkara University":             ["chitkara.edu.in"],
  "GNDU Amritsar":                   ["gndu.ac.in"],
  "Punjab Engineering College":      ["pec.edu.in"],
  "DAV College Chandigarh":          ["davchd.ac.in"],
  "Chandigarh University Mohali":    ["cumail.in","cuchd.in"],
  "NIT Jalandhar":                   ["nitj.ac.in"],
  // ── Himachal ───────────────────────────────────────────────────────────────
  "NIT Hamirpur":                    ["nith.ac.in"],
  "IIT Mandi":                       ["iitmandi.ac.in"],
  "HP University Shimla":            ["hpuniv.ac.in"],
  "HPTU Hamirpur":                   ["himtu.ac.in"],
  "Jaypee University Solan":         ["juit.ac.in"],
  "Shoolini University":             ["shooliniuniversity.com","suniv.ac.in"],
  // ── Jammu & Kashmir ────────────────────────────────────────────────────────
  "University of Jammu":             ["jammuuniversity.ac.in"],
  "NIT Srinagar":                    ["nitsri.ac.in"],
  "University of Kashmir":           ["kashmiruniversity.ac.in"],
  "SMVDU Katra":                     ["smvdu.ac.in"],
  "Cluster University Jammu":        ["clusteruniversity.ac.in"],
  "IUST Awantipora":                 ["iust.ac.in"],
  // ── Delhi ──────────────────────────────────────────────────────────────────
  "Delhi University":                ["du.ac.in"],
  "IIT Delhi":                       ["iitd.ac.in"],
  "JNU Delhi":                       ["jnu.ac.in"],
  "DTU Delhi":                       ["dtu.ac.in"],
  "NSUT Delhi":                      ["nsut.ac.in"],
  "Jamia Millia Islamia":            ["jmi.ac.in"],
  "IP University Delhi":             ["ipu.ac.in","ipuniv.ac.in"],
  "AIIMS Delhi":                     ["aiims.edu","aiims.ac.in"],
  // ── Haryana ────────────────────────────────────────────────────────────────
  "NIT Kurukshetra":                 ["nitkkr.ac.in"],
  "KUK Kurukshetra":                 ["kuk.ac.in"],
  "MDU Rohtak":                      ["mdurohtak.ac.in"],
  "Ashoka University":               ["ashoka.edu.in"],
  "Shiv Nadar University":           ["snu.edu.in"],
  "YMCA Faridabad":                  ["ymcaust.ac.in"],
  "Amity Gurugram":                  ["amity.edu","amityuniversity.ac.in"],
};
const ALL_ALLOWED_DOMAINS=new Set(Object.values(COLLEGE_DOMAINS).flat());

const INTERESTS=[
  {id:"music",   label:"Music",      icon:"🎵"},
  {id:"gaming",  label:"Gaming",     icon:"🎮"},
  {id:"fitness", label:"Fitness",    icon:"💪"},
  {id:"art",     label:"Art",        icon:"🎨"},
  {id:"travel",  label:"Travel",     icon:"✈️"},
  {id:"food",    label:"Foodie",     icon:"🍜"},
  {id:"movies",  label:"Movies",     icon:"🎬"},
  {id:"books",   label:"Reading",    icon:"📚"},
  {id:"dance",   label:"Dance",      icon:"💃"},
  {id:"tech",    label:"Tech",       icon:"💻"},
  {id:"sports",  label:"Sports",     icon:"⚽"},
  {id:"poetry",  label:"Poetry",     icon:"✍️"},
  {id:"comedy",  label:"Comedy",     icon:"😂"},
  {id:"nature",  label:"Nature",     icon:"🌿"},
  {id:"fashion", label:"Fashion",    icon:"👗"},
  {id:"coffee",  label:"Coffee",     icon:"☕"},
  {id:"anime",   label:"Anime",      icon:"🌸"},
  {id:"astro",   label:"Astrology",  icon:"♊"},
];
const YEAR_OPTS=["1st Year","2nd Year","3rd Year","4th Year","5th Year","PG / Masters","PhD"];
const LOOKING_FOR=[
  {id:"dating",   label:"Dating",        icon:"💘"},
  {id:"serious",  label:"Something Serious",icon:"💍"},
  {id:"friends",  label:"Just Friends",  icon:"🤝"},
  {id:"vibes",    label:"Just Vibes",    icon:"✨"},
];
const AVATAR_EMOJIS=["🐼","🦊","🐸","🦋","🐺","🦁","🐯","🦄","🐻","🐙","🦀","🐬","🦚","🦜","🌸","🍑","🍓","🌙","⭐","🔥"];
const AVATAR_BIGS=["😊","😎","🥹","😏","🤩","😌","🥰","😇","🤓","😜"];

const GENDER_OPTS=["Male","Female","Non-binary","Prefer not to say"];
const GENDER_ICONS={Male:"👦",Female:"👧","Non-binary":"🧑","Prefer not to say":"🙂"};

const AUTO_REPLIES=[
  "heyy!! omg finally 😭","wait so you're from there too?? wild",
  "lol okay now I'm curious 👀","okay tell me something interesting about yourself",
  "no way, that's actually so cool","haha okay you seem fun 😄",
  "so like… what are you studying?","same tbh, exams are killing me rn 💀",
  "are you nervous? bc I am a little lol","✨ vibes ✨",
];
let replyIdx=0;
const chatKey=(a,b)=>[Math.min(a,b),Math.max(a,b)].join("-");
const fmtTime=ts=>new Date(ts).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

const DEMO_PROFILES=[
  {interests:["music","travel","coffee"],bio:"vibes > everything. final year CSE, trying to survive 😅",year:"4th Year",lookingFor:"vibes",avatar:"🦊",photoUrl:""},
  {interests:["dance","art","fashion"],bio:"if you know a good cafe in chandigarh lmk 🙏",year:"3rd Year",lookingFor:"friends",avatar:"🌸",photoUrl:""},
  {interests:["gaming","tech","anime"],bio:"3am gaming sessions, 6am lectures. the grind never stops.",year:"2nd Year",lookingFor:"vibes",avatar:"🐼",photoUrl:""},
  {interests:["fitness","sports","food"],bio:"gym rat by day, student by night. love hiking too 🏔️",year:"3rd Year",lookingFor:"dating",avatar:"🦁",photoUrl:""},
  {interests:["books","coffee","poetry"],bio:"english lit major who somehow ended up in Delhi. serendipity.",year:"2nd Year",lookingFor:"serious",avatar:"📚",photoUrl:""},
  {interests:["music","movies","astro"],bio:"scorpio moon, iit delhi, currently in existential crisis (cute)",year:"1st Year",lookingFor:"friends",avatar:"🌙",photoUrl:""},
  {interests:["tech","gaming","food"],bio:"ML enthusiast. i rate biryani restaurants on a spreadsheet.",year:"3rd Year",lookingFor:"vibes",avatar:"💻",photoUrl:""},
  {interests:["art","nature","travel"],bio:"painter + overthinker. looking for someone to explore trails with.",year:"PG / Masters",lookingFor:"dating",avatar:"🦋",photoUrl:""},
];
const DEMO=[
  {id:1,name:"Arjun Sharma",  gender:"Male",  age:20,email:"arjun@panjabuni.ac.in",  state:"Punjab",  college:"Panjab University Chandigarh",  instagram:"@arjun.sharma",phone:"9876543210",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[0]},
  {id:2,name:"Priya Singh",   gender:"Female",age:21,email:"priya@thapar.edu",        state:"Punjab",  college:"Thapar Institute",              instagram:"@priya.singh", phone:"9876543211",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[1]},
  {id:3,name:"Rohit Verma",   gender:"Male",  age:22,email:"rohit@lpu.ac.in",         state:"Punjab",  college:"Lovely Professional University",instagram:"@rohit_v",    phone:"9876543212",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[2]},
  {id:4,name:"Simran Kaur",   gender:"Female",age:20,email:"simran@nithamirpur.ac.in",state:"Himachal",college:"NIT Hamirpur",                  instagram:"@simran.kaur",phone:"9876543213",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[3]},
  {id:5,name:"Karan Mehta",   gender:"Male",  age:21,email:"karan@du.ac.in",          state:"Delhi",   college:"Delhi University",              instagram:"@karan.mehta",phone:"9876543214",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[4]},
  {id:6,name:"Ananya Patel",  gender:"Female",age:22,email:"ananya@iitd.ac.in",       state:"Delhi",   college:"IIT Delhi",                     instagram:"@ananya.p",   phone:"9876543215",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[5]},
  {id:7,name:"Vikram Nanda",  gender:"Male",  age:19,email:"vikram@nitsrinagar.ac.in",state:"Jammu",   college:"NIT Srinagar",                  instagram:"@vikram.n",   phone:"9876543216",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[6]},
  {id:8,name:"Neha Gupta",    gender:"Female",age:20,email:"neha@ashoka.edu.in",       state:"Haryana", college:"Ashoka University",             instagram:"@neha.gupta", phone:"9876543217",password:"demo1234",matchedWith:null,paymentPaid:false,...DEMO_PROFILES[7]},
];

// ── Wrap ──────────────────────────────────────────────────────────────────────
function Wrap({children,toast}){
  return(
    <div style={{minHeight:"100vh",background:"#07071a",fontFamily:FF,color:"#e8e8ff",position:"relative",overflowX:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-25%",left:"-20%",width:"75vw",height:"75vw",background:"radial-gradient(circle,rgba(114,9,183,0.2),transparent 65%)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",bottom:"-25%",right:"-20%",width:"65vw",height:"65vw",background:"radial-gradient(circle,rgba(247,37,133,0.15),transparent 65%)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",top:"45%",left:"45%",transform:"translate(-50%,-50%)",width:"55vw",height:"55vw",background:"radial-gradient(circle,rgba(76,201,240,0.06),transparent 65%)",borderRadius:"50%"}}/>
      </div>
      {toast&&(
        <div style={{position:"fixed",top:18,right:18,zIndex:2000,animation:"slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          background:toast.type==="err"?"rgba(200,30,60,0.95)":toast.type==="info"?"rgba(30,100,200,0.95)":"rgba(6,175,120,0.95)",
          padding:"12px 18px",borderRadius:14,maxWidth:310,fontSize:13,fontWeight:500,lineHeight:1.4,color:"#fff"}}>
          {toast.msg}
        </div>
      )}
      <div style={{position:"relative",zIndex:1}}>{children}</div>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({user,size=44,style={}}){
  if(user?.photoUrl){
    return <img src={user.photoUrl} alt="" style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,...style}}/>;
  }
  const emoji=user?.avatar||(user?.gender==="Female"?"👩":"👨");
  return(
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:`linear-gradient(135deg,${user?.gender==="Female"?pk:bl},${pu})`,
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:size*0.46,lineHeight:1,...style}}>
      {emoji}
    </div>
  );
}

// ── InterestTags (read-only display) ─────────────────────────────────────────
function InterestTags({ids=[],max=6}){
  const shown=INTERESTS.filter(i=>ids.includes(i.id)).slice(0,max);
  if(!shown.length) return null;
  return(
    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
      {shown.map(i=>(
        <span key={i.id} style={{display:"inline-flex",alignItems:"center",gap:4,
          padding:"4px 10px",borderRadius:20,fontSize:12,
          background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
          color:"rgba(255,255,255,0.65)"}}>
          {i.icon} {i.label}
        </span>
      ))}
    </div>
  );
}

// ── ProfileCard (anonymous public view) ──────────────────────────────────────
function ProfileCard({user}){
  const lf=LOOKING_FOR.find(x=>x.id===user.lookingFor);
  return(
    <div className="hc" style={{...card,marginBottom:12,padding:"16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
        <Avatar user={user} size={52}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:15,marginBottom:2}}>{user.gender} Student</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            {user.college} · {user.year||user.state}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5,flexShrink:0}}>
          {user.matchedWith&&<span style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:"rgba(6,214,160,0.1)",color:gr,border:`1px solid ${gr}30`}}>💘 Matched</span>}
          {lf&&<span style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.4)",border:"1px solid rgba(255,255,255,0.08)"}}>{lf.icon} {lf.label}</span>}
        </div>
      </div>
      {user.bio&&<p style={{margin:"0 0 10px",fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.55,fontStyle:"italic"}}>"{user.bio}"</p>}
      <InterestTags ids={user.interests||[]}/>
    </div>
  );
}

// ── ProfileEdit screen ────────────────────────────────────────────────────────
function ProfileEdit({user,onSave,onChangePassword,onBack,toast}){
  const [draft,setDraft]=useState({
    bio:user.bio||"",
    interests:user.interests||[],
    year:user.year||"",
    lookingFor:user.lookingFor||"",
    avatar:user.avatar||"🦊",
    photoUrl:user.photoUrl||"",
    instagram:user.instagram||"",
    phone:user.phone||"",
  });
  const [tab,setTab]=useState("vibe");  // vibe | contact | avatar | security
  const [pwForm,setPwForm]=useState({current:"",next:"",confirm:""});
  const [pwVisible,setPwVisible]=useState({current:false,next:false,confirm:false});
  const toggle=(id)=>setDraft(d=>{
    const has=d.interests.includes(id);
    if(!has&&d.interests.length>=8) return d;
    return {...d,interests:has?d.interests.filter(x=>x!==id):[...d.interests,id]};
  });
  const submitPw=()=>{
    if(!pwForm.current){toast&&null;onChangePassword&&onChangePassword(pwForm);return;}
    onChangePassword(pwForm);
  };

  return(
    <Wrap toast={toast}>
      <div style={{maxWidth:480,margin:"0 auto",paddingBottom:60}}>
        {/* Header */}
        <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(7,7,26,0.92)",backdropFilter:"blur(14px)",
          borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"14px 20px",
          display:"flex",alignItems:"center",gap:14}}>
          <button onClick={onBack} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:20,padding:0,fontFamily:FF,lineHeight:1}}>←</button>
          <span style={{fontWeight:800,fontSize:17,flex:1}}>Edit Profile</span>
          <button onClick={()=>onSave(draft)} style={{background:`linear-gradient(135deg,${pk},${pu})`,border:"none",borderRadius:10,padding:"8px 18px",color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:FF}}>Save ✓</button>
        </div>

        <div style={{padding:"24px 20px 0"}}>
          {/* Profile preview */}
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{position:"relative",display:"inline-block",marginBottom:14}}>
              <Avatar user={{...user,...draft}} size={88}/>
              <button onClick={()=>setTab("avatar")} style={{
                position:"absolute",bottom:0,right:0,
                width:30,height:30,borderRadius:"50%",border:"2px solid #07071a",
                background:`linear-gradient(135deg,${pk},${pu})`,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,
              }}>✏️</button>
            </div>
            <div style={{fontWeight:800,fontSize:18}}>{user.name}</div>
            <div style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>{user.college}</div>
          </div>

          {/* Sub-tabs */}
          <div style={{display:"flex",gap:6,marginBottom:24,background:"rgba(255,255,255,0.04)",padding:4,borderRadius:12}}>
            {[["vibe","✨ Vibe"],["contact","📲 Contact"],["avatar","🖼️ Avatar"],["security","🔒 Security"]].map(([id,lbl])=>(
              <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"9px",border:"none",borderRadius:9,cursor:"pointer",fontFamily:FF,fontSize:12,fontWeight:600,transition:"all 0.2s",background:tab===id?`linear-gradient(135deg,${pk},${pu})`:"transparent",color:tab===id?"#fff":"rgba(255,255,255,0.42)"}}>
                {lbl}
              </button>
            ))}
          </div>

          {/* Vibe tab */}
          {tab==="vibe"&&(
            <div style={{animation:"fadeUp 0.3s ease"}}>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Bio</label>
              <textarea
                value={draft.bio}
                onChange={e=>setDraft(d=>({...d,bio:e.target.value}))}
                placeholder="Tell them who you are… (max 140 chars)"
                maxLength={140}
                style={{...inp,resize:"none",minHeight:90,lineHeight:1.6,marginBottom:6}}
              />
              <div style={{textAlign:"right",fontSize:11,color:"rgba(255,255,255,0.25)",marginBottom:22}}>{draft.bio.length}/140</div>

              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Interests <span style={{color:"rgba(255,255,255,0.25)",fontWeight:400,textTransform:"none",letterSpacing:0}}>pick up to 8</span></label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:22}}>
                {INTERESTS.map(i=>(
                  <button key={i.id} onClick={()=>toggle(i.id)} style={{...pill(draft.interests.includes(i.id)),fontFamily:FF,display:"flex",alignItems:"center",gap:5}}>
                    {i.icon} {i.label}
                  </button>
                ))}
              </div>

              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Year of Study</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:22}}>
                {YEAR_OPTS.map(y=>(
                  <button key={y} onClick={()=>setDraft(d=>({...d,year:y}))} style={{...pill(draft.year===y,bl),fontFamily:FF}}>
                    {y}
                  </button>
                ))}
              </div>

              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Looking For</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                {LOOKING_FOR.map(lf=>(
                  <button key={lf.id} onClick={()=>setDraft(d=>({...d,lookingFor:lf.id}))} style={{
                    padding:"12px",border:`1.5px solid ${draft.lookingFor===lf.id?pk+"80":"rgba(255,255,255,0.09)"}`,
                    borderRadius:12,cursor:"pointer",fontFamily:FF,fontSize:13,fontWeight:500,
                    background:draft.lookingFor===lf.id?"rgba(247,37,133,0.08)":"rgba(255,255,255,0.04)",
                    color:draft.lookingFor===lf.id?"#e8e8ff":"rgba(255,255,255,0.5)",transition:"all 0.2s",
                    display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                  }}>
                    <span style={{fontSize:22}}>{lf.icon}</span>
                    {lf.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact tab */}
          {tab==="contact"&&(
            <div style={{animation:"fadeUp 0.3s ease"}}>
              <div style={{...card,marginBottom:16,background:"rgba(76,201,240,0.05)",border:`1px solid rgba(76,201,240,0.18)`,fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.65}}>
                🔐 Your contact info is <strong style={{color:bl}}>100% hidden</strong> from other students. Only your match sees it after admin approval.
              </div>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Instagram</label>
              <input value={draft.instagram} onChange={e=>setDraft(d=>({...d,instagram:e.target.value}))} placeholder="@yourhandle" style={{...inp,marginBottom:16}}/>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Phone</label>
              <input value={draft.phone} onChange={e=>setDraft(d=>({...d,phone:e.target.value}))} placeholder="10-digit number" type="tel" style={{...inp,marginBottom:16}}/>
            </div>
          )}

          {/* Avatar tab */}
          {tab==="avatar"&&(
            <div style={{animation:"fadeUp 0.3s ease"}}>

              {/* Live preview */}
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{position:"relative",display:"inline-block"}}>
                  <Avatar user={{...user,...draft}} size={100}/>
                  {draft.photoUrl&&(
                    <button onClick={()=>setDraft(d=>({...d,photoUrl:""}))} style={{
                      position:"absolute",top:-6,right:-6,
                      width:26,height:26,borderRadius:"50%",border:"2px solid #07071a",
                      background:"rgba(200,40,40,0.9)",cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:13,color:"#fff",
                    }}>✕</button>
                  )}
                </div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:8}}>preview</div>
              </div>

              {/* Camera capture */}
              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:10}}>Take a Photo</label>
              <label style={{
                display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                padding:"14px",borderRadius:14,cursor:"pointer",marginBottom:18,
                background:`linear-gradient(135deg,${pk}22,${pu}22)`,
                border:`1.5px dashed ${pk}60`,
                fontSize:14,fontWeight:700,color:"#e8e8ff",
              }}>
                <span style={{fontSize:22}}>📸</span>
                Open Camera
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  style={{display:"none"}}
                  onChange={e=>{
                    const file=e.target.files?.[0];
                    if(!file)return;
                    const reader=new FileReader();
                    reader.onload=ev=>setDraft(d=>({...d,photoUrl:ev.target.result,avatar:""}));
                    reader.readAsDataURL(file);
                  }}
                />
              </label>

              {/* Upload from gallery */}
              <label style={{
                display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                padding:"14px",borderRadius:14,cursor:"pointer",marginBottom:22,
                background:"rgba(255,255,255,0.05)",
                border:"1.5px dashed rgba(255,255,255,0.15)",
                fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.55)",
              }}>
                <span style={{fontSize:22}}>🖼️</span>
                Upload from Gallery
                <input
                  type="file"
                  accept="image/*"
                  style={{display:"none"}}
                  onChange={e=>{
                    const file=e.target.files?.[0];
                    if(!file)return;
                    if(file.size>5*1024*1024){alert("Image must be under 5MB");return;}
                    const reader=new FileReader();
                    reader.onload=ev=>setDraft(d=>({...d,photoUrl:ev.target.result,avatar:""}));
                    reader.readAsDataURL(file);
                  }}
                />
              </label>

              <div style={{height:1,background:"rgba(255,255,255,0.07)",margin:"4px 0 20px",position:"relative"}}>
                <span style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",background:"#07071a",padding:"0 12px",fontSize:11,color:"rgba(255,255,255,0.3)"}}>or pick an avatar</span>
              </div>

              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:10}}>Animal Avatars</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
                {AVATAR_EMOJIS.map(e=>(
                  <button key={e} onClick={()=>setDraft(d=>({...d,avatar:e,photoUrl:""}))} style={{
                    width:46,height:46,borderRadius:12,fontSize:22,cursor:"pointer",
                    background:draft.avatar===e&&!draft.photoUrl?"rgba(247,37,133,0.12)":"rgba(255,255,255,0.05)",
                    border:`1.5px solid ${draft.avatar===e&&!draft.photoUrl?pk+"60":"rgba(255,255,255,0.09)"}`,
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                  }}>{e}</button>
                ))}
              </div>
              <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:10}}>Face Avatars</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {AVATAR_BIGS.map(e=>(
                  <button key={e} onClick={()=>setDraft(d=>({...d,avatar:e,photoUrl:""}))} style={{
                    width:46,height:46,borderRadius:12,fontSize:22,cursor:"pointer",
                    background:draft.avatar===e&&!draft.photoUrl?"rgba(247,37,133,0.12)":"rgba(255,255,255,0.05)",
                    border:`1.5px solid ${draft.avatar===e&&!draft.photoUrl?pk+"60":"rgba(255,255,255,0.09)"}`,
                    display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",
                  }}>{e}</button>
                ))}
              </div>
            </div>
          )}

          {/* Security tab */}
          {tab==="security"&&(
            <div style={{animation:"fadeUp 0.3s ease"}}>
              <div style={{...card,marginBottom:20,background:"rgba(247,37,133,0.04)",border:`1px solid rgba(247,37,133,0.15)`,fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.65}}>
                🔑 Enter your current password to confirm it's you, then set a new one.
              </div>

              {[
                {key:"current", label:"Current Password",  placeholder:"Your current password"},
                {key:"next",    label:"New Password",       placeholder:"At least 8 characters"},
                {key:"confirm", label:"Confirm New Password",placeholder:"Repeat new password"},
              ].map(({key,label,placeholder})=>(
                <div key={key} style={{marginBottom:16}}>
                  <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>{label}</label>
                  <div style={{position:"relative"}}>
                    <input
                      type={pwVisible[key]?"text":"password"}
                      value={pwForm[key]}
                      onChange={e=>setPwForm(f=>({...f,[key]:e.target.value}))}
                      placeholder={placeholder}
                      style={{...inp,paddingRight:48}}
                    />
                    <button
                      onClick={()=>setPwVisible(v=>({...v,[key]:!v[key]}))}
                      style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"rgba(255,255,255,0.35)",padding:0,lineHeight:1}}
                    >
                      {pwVisible[key]?"🙈":"👁️"}
                    </button>
                  </div>
                </div>
              ))}

              {/* Strength meter */}
              {pwForm.next&&(()=>{
                const len=pwForm.next.length;
                const hasUpper=/[A-Z]/.test(pwForm.next);
                const hasNum=/[0-9]/.test(pwForm.next);
                const hasSpec=/[^a-zA-Z0-9]/.test(pwForm.next);
                const score=[len>=8,hasUpper,hasNum,hasSpec].filter(Boolean).length;
                const labels=["","Weak","Fair","Good","Strong"];
                const colors=["","#e05050",am,bl,gr];
                return(
                  <div style={{marginBottom:20}}>
                    <div style={{display:"flex",gap:4,marginBottom:6}}>
                      {[1,2,3,4].map(i=>(
                        <div key={i} style={{flex:1,height:4,borderRadius:4,background:i<=score?colors[score]:"rgba(255,255,255,0.08)",transition:"all 0.3s"}}/>
                      ))}
                    </div>
                    <div style={{fontSize:11,color:colors[score],fontWeight:600}}>{labels[score]}</div>
                  </div>
                );
              })()}

              {pwForm.confirm&&pwForm.next&&pwForm.confirm!==pwForm.next&&(
                <div style={{fontSize:12,color:"#e05050",marginBottom:12,padding:"8px 12px",background:"rgba(224,80,80,0.08)",borderRadius:8,border:"1px solid rgba(224,80,80,0.2)"}}>
                  ✗ Passwords don't match
                </div>
              )}
              {pwForm.confirm&&pwForm.next&&pwForm.confirm===pwForm.next&&pwForm.next.length>=8&&(
                <div style={{fontSize:12,color:gr,marginBottom:12,padding:"8px 12px",background:"rgba(6,214,160,0.08)",borderRadius:8,border:"1px solid rgba(6,214,160,0.2)"}}>
                  ✓ Passwords match
                </div>
              )}

              <button onClick={submitPw} style={btn(pk)}>Update Password 🔑</button>
            </div>
          )}

          <div style={{height:32}}/>
          {tab!=="security"&&<button onClick={()=>onSave(draft)} style={btn(pk)}>Save Changes ✓</button>}
        </div>
      </div>
    </Wrap>
  );
}

// ── PaymentModal ──────────────────────────────────────────────────────────────
const UPI_ID  = "8168086817@ptyes";
const UPI_AMT = 300;
const UPI_LINK= `upi://pay?pa=${UPI_ID}&pn=HAZE&am=${UPI_AMT}&cu=INR&tn=HAZE+match+fee`;
const GPAY    = `gpay://upi/pay?pa=${UPI_ID}&pn=HAZE&am=${UPI_AMT}&cu=INR&tn=HAZE+match+fee`;
const PHONEPE = `phonepe://pay?pa=${UPI_ID}&pn=HAZE&am=${UPI_AMT}&cu=INR&tn=HAZE+match+fee`;
const PAYTM   = `paytmmp://pay?pa=${UPI_ID}&pn=HAZE&am=${UPI_AMT}&cu=INR&tn=HAZE+match+fee`;

function PaymentModal({onPaid,toast}){
  const [copied,setCopied]=useState(false);
  const copy=()=>{
    try{navigator.clipboard.writeText(UPI_ID);}catch(_){}
    setCopied(true);setTimeout(()=>setCopied(false),2200);
  };
  return(
    <div style={{
      position:"fixed",inset:0,zIndex:500,
      background:"rgba(7,7,26,0.96)",backdropFilter:"blur(8px)",
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"20px",
    }}>
      <div style={{
        width:"100%",maxWidth:400,
        background:"rgba(255,255,255,0.055)",
        border:"1px solid rgba(255,255,255,0.12)",
        borderRadius:24,overflow:"hidden",
      }}>
        {/* Header strip */}
        <div style={{
          background:`linear-gradient(135deg,${pk},${pu})`,
          padding:"22px 24px 18px",textAlign:"center",
        }}>
          <div style={{fontSize:44,marginBottom:8}}>💘</div>
          <div style={{fontWeight:800,fontSize:20,color:"#fff",marginBottom:4}}>You've been matched on HAZE!</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.75)"}}>Pay ₹300 to reveal your match's details</div>
        </div>

        <div style={{padding:"22px 22px 26px"}}>
          {/* Amount */}
          <div style={{
            textAlign:"center",marginBottom:22,
            background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"16px",
            border:"1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:6,fontWeight:600}}>Amount to pay</div>
            <div style={{fontSize:44,fontWeight:800,color:"#fff",letterSpacing:-1}}>₹300</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:4}}>one-time · non-refundable</div>
          </div>

          {/* UPI ID copy row */}
          <div style={{marginBottom:18}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>UPI ID</div>
            <div style={{
              display:"flex",alignItems:"center",gap:10,
              background:"rgba(255,255,255,0.07)",borderRadius:12,
              padding:"12px 14px",border:"1px solid rgba(255,255,255,0.12)",
            }}>
              <span style={{flex:1,fontFamily:"monospace",fontSize:15,fontWeight:700,color:"#e8e8ff",letterSpacing:0.5}}>{UPI_ID}</span>
              <button onClick={copy} style={{
                background:copied?`linear-gradient(135deg,${gr},${gr}bb)`:"rgba(255,255,255,0.1)",
                border:"none",borderRadius:8,padding:"6px 12px",
                color:copied?"#07071a":"rgba(255,255,255,0.7)",
                fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:FF,
                transition:"all 0.2s",whiteSpace:"nowrap",
              }}>
                {copied?"✓ Copied":"Copy"}
              </button>
            </div>
          </div>

          {/* App buttons */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>Pay with</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[
                {label:"GPay",    href:GPAY,    bg:"#1a73e8",emoji:"🔵"},
                {label:"PhonePe", href:PHONEPE, bg:"#5f259f",emoji:"🟣"},
                {label:"Paytm",   href:PAYTM,   bg:"#002970",emoji:"🔷"},
                {label:"Any UPI", href:UPI_LINK, bg:"rgba(255,255,255,0.08)",emoji:"📲"},
              ].map(({label,href,bg,emoji})=>(
                <a key={label} href={href} style={{
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  padding:"12px",borderRadius:12,textDecoration:"none",
                  background:bg,color:"#fff",fontWeight:700,fontSize:13,fontFamily:FF,
                  border:"1px solid rgba(255,255,255,0.1)",
                }}>
                  <span style={{fontSize:16}}>{emoji}</span> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Screenshot instruction */}
          <div style={{
            background:"rgba(255,209,102,0.07)",border:"1px solid rgba(255,209,102,0.2)",
            borderRadius:12,padding:"12px 14px",marginBottom:20,
            fontSize:12,color:"rgba(255,209,102,0.85)",lineHeight:1.65,
          }}>
            📸 After paying, take a screenshot of the payment and send it to <strong style={{color:am}}>8168086817</strong> on WhatsApp. HAZE team will approve within a few hours.
          </div>

          {/* Customer care */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"11px 14px",background:"rgba(255,255,255,0.04)",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)"}}>
            <span style={{fontSize:18}}>🎧</span>
            <div style={{flex:1,fontSize:12,color:"rgba(255,255,255,0.45)"}}>
              Need help? Call / WhatsApp us at
              <a href="tel:8168086817" style={{color:bl,fontWeight:700,textDecoration:"none",marginLeft:5}}>8168086817</a>
            </div>
          </div>

          {/* Done button (demo — real app needs admin approval) */}
          <button onClick={onPaid} style={{
            width:"100%",padding:"14px",border:"none",borderRadius:12,
            background:`linear-gradient(135deg,${gr},${gr}bb)`,
            color:"#07071a",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:FF,
            letterSpacing:0.3,
          }}>
            ✓ I've Paid — Show My Match
          </button>
          <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.22)",marginTop:10}}>
            Demo mode: button unlocks immediately. Real app needs admin verification.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ChatScreen ─────────────────────────────────────────────────────────────────
function ChatScreen({me,partner,chats,setChats,onClose,toast}){
  const key=chatKey(me.id,partner.id);
  const messages=chats[key]||[];
  const [text,setText]=useState("");
  const [typing,setTyping]=useState(false);
  const bottomRef=useRef(null);
  const inputRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,typing]);
  useEffect(()=>{setTimeout(()=>inputRef.current?.focus(),120);},[]);
  const send=()=>{
    const t=text.trim(); if(!t)return;
    const msg={id:Date.now(),senderId:me.id,text:t,ts:Date.now()};
    setChats(p=>({...p,[key]:[...(p[key]||[]),msg]}));
    setText(""); setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      const reply={id:Date.now()+1,senderId:partner.id,text:AUTO_REPLIES[replyIdx%AUTO_REPLIES.length],ts:Date.now()};
      replyIdx++;
      setChats(p=>({...p,[key]:[...(p[key]||[]),reply]}));
    },1200+Math.random()*900);
  };
  return(
    <Wrap toast={toast}>
      <div style={{maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",height:"100vh"}}>
        {/* Header */}
        <div style={{flexShrink:0,display:"flex",alignItems:"center",gap:14,padding:"14px 18px",
          background:"rgba(7,7,26,0.92)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,0.5)",cursor:"pointer",fontSize:20,padding:"0 6px 0 0",fontFamily:FF,lineHeight:1}}>←</button>
          <Avatar user={partner} size={42}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:1}}>{partner.gender} · {partner.college.split(" ").slice(0,3).join(" ")}</div>
            <div style={{fontSize:11,color:typing?gr:"rgba(255,255,255,0.32)",transition:"color 0.3s",display:"flex",alignItems:"center",gap:5}}>
              {typing?(<>{[0,1,2].map(i=><span key={i} style={{width:5,height:5,borderRadius:"50%",background:gr,display:"inline-block",animation:`typingDot 1s ease-in-out ${i*0.15}s infinite`}}/>)}<span style={{marginLeft:3}}>typing…</span></>):"your match 💘"}
            </div>
          </div>
          <div style={{fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,background:"rgba(247,37,133,0.1)",color:pk,border:`1px solid ${pk}30`}}>🔐 private</div>
        </div>
        {/* Messages */}
        <div style={{flex:1,overflowY:"auto",padding:"18px 16px 8px",display:"flex",flexDirection:"column",gap:4}}>
          <div style={{textAlign:"center",marginBottom:12}}>
            <span style={{fontSize:11,color:"rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.05)",padding:"4px 12px",borderRadius:20,border:"1px solid rgba(255,255,255,0.07)"}}>Today</span>
          </div>
          {messages.length===0&&(
            <div style={{textAlign:"center",padding:"28px 20px",background:"rgba(247,37,133,0.04)",border:"1px solid rgba(247,37,133,0.15)",borderRadius:16,margin:"10px 0 20px"}}>
              <div style={{fontSize:40,marginBottom:12}}>💘</div>
              <div style={{fontWeight:700,fontSize:17,marginBottom:6}}>You've been matched!</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.38)",lineHeight:1.6}}>Private chat — only you two can see it.<br/>Go ahead, say hi!</div>
            </div>
          )}
          {messages.map((m,i)=>{
            const isMine=m.senderId===me.id;
            const prevSame=i>0&&messages[i-1].senderId===m.senderId;
            return(
              <div key={m.id} style={{display:"flex",flexDirection:"column",alignItems:isMine?"flex-end":"flex-start",marginTop:prevSame?2:10}}>
                <div style={{maxWidth:"78%",padding:"10px 14px",wordBreak:"break-word",fontSize:14,lineHeight:1.5,color:"#e8e8ff",borderRadius:isMine?"18px 18px 4px 18px":"18px 18px 18px 4px",background:isMine?`linear-gradient(135deg,${pk},${pu})`:"rgba(255,255,255,0.09)",border:isMine?"none":"1px solid rgba(255,255,255,0.1)"}}>
                  {m.text}
                </div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.22)",marginTop:3,paddingLeft:4,paddingRight:4}}>{fmtTime(m.ts)}</div>
              </div>
            );
          })}
          {typing&&(
            <div style={{display:"flex",alignItems:"flex-end",gap:8,marginTop:10}}>
              <div style={{padding:"12px 16px",borderRadius:"18px 18px 18px 4px",background:"rgba(255,255,255,0.09)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",gap:5,alignItems:"center"}}>
                {[0,1,2].map(i=><span key={i} style={{width:7,height:7,borderRadius:"50%",background:"rgba(255,255,255,0.4)",display:"inline-block",animation:`typingDot 1s ease-in-out ${i*0.15}s infinite`}}/>)}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        {/* Input */}
        <div style={{flexShrink:0,padding:"12px 14px 20px",background:"rgba(7,7,26,0.95)",backdropFilter:"blur(14px)",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{flex:1,display:"flex",alignItems:"center",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:24,padding:"0 16px",minHeight:48}}>
              <input ref={inputRef} value={text} onChange={e=>setText(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                placeholder="Type a message…"
                style={{flex:1,background:"none",border:"none",outline:"none",color:"#e8e8ff",fontSize:14,padding:"14px 0",fontFamily:FF}}/>
            </div>
            <button onClick={send} disabled={!text.trim()} style={{width:48,height:48,borderRadius:"50%",border:"none",flexShrink:0,background:text.trim()?`linear-gradient(135deg,${pk},${pu})`:"rgba(255,255,255,0.07)",cursor:text.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,transition:"all 0.2s"}}>➤</button>
          </div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",textAlign:"center",marginTop:8}}>🔒 end-to-end encrypted · only visible to your match</div>
        </div>
      </div>
    </Wrap>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [screen,      setScreen]      = useState("landing");
  const [perms,       setPerms]       = useState(()=>{try{const s=localStorage.getItem("bd_perms");return s?JSON.parse(s):{camera:false,mic:false,notif:false};}catch{return{camera:false,mic:false,notif:false};}});
  const [permsDone,   setPermsDone]   = useState(()=>{try{return localStorage.getItem("bd_perms_done")==="1";}catch{return false;}});
  const [users,       setUsers]       = useState(DEMO);
  const [currentUser, setCurrentUser] = useState(null);
  const [step,        setStep]        = useState(1);
  const [form,        setForm]        = useState({name:"",gender:"",age:"",email:"",state:"",college:"",instagram:"",phone:"",bio:"",interests:[],year:"",lookingFor:"",avatar:"🦊",photoUrl:"",password:""});
  const [otp,         setOtp]         = useState("");
  const [genOtp,      setGenOtp]      = useState("");
  const [otpSent,     setOtpSent]     = useState(false);
  const [otpOk,       setOtpOk]       = useState(false);
  const [adminAuth,   setAdminAuth]   = useState(false);
  const [adminCreds,  setAdminCreds]  = useState({email:"",password:""});
  const [loginForm,   setLoginForm]   = useState({email:"",password:""});
  const [loginMode,   setLoginMode]   = useState(false);
  const [forgotMode,  setForgotMode]  = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp,   setForgotOtp]   = useState("");
  const [forgotGenOtp,setForgotGenOtp]= useState("");
  const [forgotOtpSent,setForgotOtpSent]=useState(false);
  const [forgotOtpOk, setForgotOtpOk] = useState(false);
  const [newPw,       setNewPw]       = useState("");
  const [confirmPw,   setConfirmPw]   = useState("");
  const [matchSel,    setMatchSel]    = useState(["",""]);
  const [toast,       setToast]       = useState(null);
  const [greeting,    setGreeting]    = useState("Good Evening ✨");
  const [activeTab,   setActiveTab]   = useState("matches");
  const [chatOpen,    setChatOpen]    = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [chats,       setChats]       = useState({});
  const [homeTab,     setHomeTab]     = useState("discover"); // discover | myprofile

  useEffect(()=>{
    const h=new Date().getHours();
    if(h>=5&&h<12)setGreeting("Good Morning ☀️");
    else if(h>=12&&h<17)setGreeting("Good Afternoon 🌤");
    else if(h>=17&&h<21)setGreeting("Good Evening 🌆");
    else setGreeting("Good Night 🌙");
    const link=document.createElement("link");
    link.rel="stylesheet";link.href="https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.18/index.css";
    document.head.appendChild(link);
    const s=document.createElement("style");
    s.textContent=`
      @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      @keyframes slideIn{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
      @keyframes fadeUp{from{transform:translateY(22px);opacity:0}to{transform:translateY(0);opacity:1}}
      @keyframes typingDot{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1.1);opacity:1}}
      input::placeholder,textarea::placeholder{color:rgba(200,200,255,0.28)!important}
      select option{background:#10102e;color:#e8e8ff}
      *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
      input:focus,select:focus,textarea:focus{border-color:rgba(247,37,133,0.6)!important;box-shadow:0 0 0 3px rgba(247,37,133,0.1)!important}
      ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:4px}
      .hc:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.18)!important}
      .hc{transition:transform 0.2s,border-color 0.2s}
    `;
    document.head.appendChild(s);
  },[]);

  const showToast=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),3500);};
  const reqPerm=async(type)=>{
    try{
      if(type==="camera")     await navigator.mediaDevices?.getUserMedia({video:true});
      else if(type==="mic")   await navigator.mediaDevices?.getUserMedia({audio:true});
      else if(type==="notif"){
        if(!("Notification" in window)){showToast("Notifications not supported in this browser","err");return;}
        const result = await Notification.requestPermission();
        if(result !== "granted"){showToast("Notifications skipped — you can still use HAZE","info");
          // still mark notif as done so it doesn't block progress
          setPerms(p=>{
            const next={...p,notif:true};
            try{localStorage.setItem("bd_perms",JSON.stringify(next));}catch(_){}
            if(next.camera&&next.mic&&next.notif){
              try{localStorage.setItem("bd_perms_done","1");}catch(_){}
              setPermsDone(true);
            }
            return next;
          });
          return;
        }
      }
    }catch(_){
      if(type==="notif"){
        // notification failure is non-blocking
        setPerms(p=>{
          const next={...p,notif:true};
          try{localStorage.setItem("bd_perms",JSON.stringify(next));}catch(_){}
          if(next.camera&&next.mic&&next.notif){
            try{localStorage.setItem("bd_perms_done","1");}catch(_){}
            setPermsDone(true);
          }
          return next;
        });
        showToast("Notifications skipped — you can still use HAZE","info");
        return;
      }
      showToast(`Could not get ${type} permission — please allow it in browser settings`,"err");
      return;
    }
    setPerms(p=>{
      const next={...p,[type]:true};
      try{localStorage.setItem("bd_perms",JSON.stringify(next));}catch(_){}
      if(next.camera&&next.mic&&next.notif){
        try{localStorage.setItem("bd_perms_done","1");}catch(_){}
        setPermsDone(true);
      }
      return next;
    });
    showToast({camera:"📷 Camera granted!",mic:"🎤 Mic is live!",notif:"🔔 Notifications on!"}[type]);
  };
  const sendOtp=async()=>{
    if(!form.email.includes("@")){showToast("Enter a valid email","err");return;}
    const already=users.find(u=>u.email.toLowerCase()===form.email.trim().toLowerCase());
    if(already){showToast("This email is already registered. Please log in instead.","err");return;}
    const domain=form.email.trim().toLowerCase().split("@")[1];
    if(!ALL_ALLOWED_DOMAINS.has(domain)){
      showToast(`❌ Only official college emails are allowed. "${domain}" is not recognised.`,"err");
      return;
    }
    const code=String(Math.floor(100000+Math.random()*900000));
    setGenOtp(code);
    showToast("Sending OTP to your email...","info");
    try{
      const ejs = await new Promise((resolve,reject)=>{
        if(window.emailjs){resolve(window.emailjs);return;}
        const s=document.createElement("script");
        s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload=()=>resolve(window.emailjs);
        s.onerror=()=>reject(new Error("Failed to load EmailJS"));
        document.head.appendChild(s);
      });
      ejs.init("HdWsr1MTduz1fMWbQ");
      await ejs.send("service_82s4we9","template_rgqzlj5",{
        to_email: form.email.trim(),
        otp_code: code,
        passcode: code,
      });
      setOtpSent(true);
      showToast(`✅ OTP sent to ${form.email.trim()} — check your inbox!`);
    }catch(err){
      console.error("EmailJS error:",err);
      showToast(`Failed to send OTP: ${err?.text||err?.message||"unknown error"}. Try again.`,"err");
    }
  };
  const verifyOtp=()=>{
    if(otp===genOtp){setOtpOk(true);setStep(3);showToast("✅ Email verified!");}
    else showToast("Incorrect OTP","err");
  };
  const submitSignup=()=>{
    if(!form.state||!form.college){showToast("Select your college","err");return;}
    // verify email domain matches the chosen college
    const domain=form.email.trim().toLowerCase().split("@")[1];
    const allowed=COLLEGE_DOMAINS[form.college]||[];
    if(allowed.length>0&&!allowed.includes(domain)){
      showToast(`Your email domain @${domain} doesn't match ${form.college}. Use your official college email.`,"err");
      return;
    }
    const nu={id:users.length+1,...form,age:parseInt(form.age)||18,matchedWith:null,paymentPaid:false};
    setUsers(u=>[...u,nu]);setCurrentUser(nu);setScreen("home");
    showToast(`Welcome, ${form.name.split(" ")[0]}! 🎉`);
  };
  const adminLogin=()=>{
    if(adminCreds.email===ADMIN.email&&adminCreds.password===ADMIN.password){
      setAdminAuth(true);setScreen("admin");showToast("Welcome back, Admin 👑");
    }else showToast("Invalid credentials","err");
  };
  const handleLogin=()=>{
    const email=loginForm.email.trim().toLowerCase();
    const pw=loginForm.password;
    if(!email||!pw){showToast("Enter email and password","err");return;}
    // legacy admin
    if(email===ADMIN.email&&pw===ADMIN.password){
      setAdminAuth(true);setScreen("admin");showToast("Welcome back, Admin 👑");return;
    }
    // student login — match by email + verify password
    const found=users.find(u=>u.email.toLowerCase()===email);
    if(!found){showToast("No account found with that email","err");return;}
    if(!found.password||pw!==found.password){showToast("Incorrect password","err");return;}
    setCurrentUser(found);setScreen("home");setLoginMode(false);
    showToast(`Welcome back, ${found.name.split(" ")[0]}! 👋`);
  };
  const handleForgotSendOtp=async()=>{
    const email=forgotEmail.trim().toLowerCase();
    if(!email.includes("@")){showToast("Enter your registered email","err");return;}
    const found=users.find(u=>u.email.toLowerCase()===email);
    if(!found){showToast("No account found with that email","err");return;}
    const code=String(Math.floor(100000+Math.random()*900000));
    setForgotGenOtp(code);
    showToast("Sending OTP to your email...","info");
    try{
      const ejs=await new Promise((resolve,reject)=>{
        if(window.emailjs){resolve(window.emailjs);return;}
        const s=document.createElement("script");
        s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload=()=>resolve(window.emailjs);
        s.onerror=()=>reject(new Error("Failed to load EmailJS"));
        document.head.appendChild(s);
      });
      ejs.init("HdWsr1MTduz1fMWbQ");
      await ejs.send("service_82s4we9","template_rgqzlj5",{
        to_email: email,
        otp_code: code,
        passcode: code,
      });
      setForgotOtpSent(true);
      showToast(`✅ OTP sent to ${email} — check your inbox!`);
    }catch(err){
      showToast(`Failed to send OTP: ${err?.text||err?.message||"unknown error"}`,"err");
    }
  };
  const handleForgotReset=()=>{
    if(forgotOtp!==forgotGenOtp){showToast("Incorrect OTP","err");return;}
    if(!newPw||newPw.length<8){showToast("Password must be at least 8 characters","err");return;}
    if(newPw!==confirmPw){showToast("Passwords don't match","err");return;}
    setUsers(us=>us.map(u=>u.email.toLowerCase()===forgotEmail.trim().toLowerCase()?{...u,password:newPw}:u));
    showToast("Password reset successfully! Please log in.","ok");
    setForgotMode(false);setForgotEmail("");setForgotOtp("");setForgotGenOtp("");
    setForgotOtpSent(false);setForgotOtpOk(false);setNewPw("");setConfirmPw("");
    setLoginMode(true);
  };
  const doMatch=()=>{
    const[a,b]=matchSel.map(Number);
    if(!a||!b||a===b){showToast("Select two different students","err");return;}
    const u1=users.find(u=>u.id===a),u2=users.find(u=>u.id===b);
    if(!u1||!u2)return;
    if(u1.matchedWith||u2.matchedWith){showToast("One/both already matched","err");return;}
    setUsers(us=>us.map(u=>{
      if(u.id===a)return{...u,matchedWith:b,paymentPaid:false};
      if(u.id===b)return{...u,matchedWith:a,paymentPaid:false};
      return u;
    }));
    setMatchSel(["",""]);
    showToast(`💝 ${u1.name} ↔ ${u2.name}`);
    // Fire browser notifications for both (only fires for the current session user)
    if("Notification" in window && Notification.permission==="granted"){
      [u1,u2].forEach(u=>{
        // In a real app you'd push to each user's device via service worker
        // In demo we fire for the active session
        if(currentUser && currentUser.id===u.id){
          new Notification("💘 You've been matched on HAZE!",{
            body:`You have a new match! Pay ₹300 to ${UPI_ID} to reveal their details.`,
            icon:"https://cdn.jsdelivr.net/npm/twemoji@14/assets/72x72/1f498.png",
            tag:"haze-match",
          });
        }
      });
      // Also fire a general notification visible to admin session
      new Notification(`💝 Match created!`,{
        body:`${u1.name} ↔ ${u2.name} — both notified to pay ₹300`,
        tag:"haze-admin-match",
      });
    }
  };
  const doUnmatch=(uid)=>{
    const u=users.find(x=>x.id===uid);if(!u?.matchedWith)return;
    const pid=u.matchedWith;
    setUsers(us=>us.map(x=>(x.id===uid||x.id===pid)?{...x,matchedWith:null}:x));
    showToast("Match removed");
  };
  const saveProfile=(draft)=>{
    setUsers(us=>us.map(u=>u.id===currentUser.id?{...u,...draft}:u));
    setCurrentUser(cu=>({...cu,...draft}));
    setEditProfile(false);
    showToast("Profile updated! ✨");
  };
  const changePassword=({current,next,confirm})=>{
    const me=users.find(u=>u.id===currentUser.id);
    if(!current){showToast("Enter your current password","err");return;}
    if(me.password&&current!==me.password){showToast("Current password is incorrect","err");return;}
    if(!next||next.length<8){showToast("New password must be at least 8 characters","err");return;}
    if(next!==confirm){showToast("Passwords don't match","err");return;}
    setUsers(us=>us.map(u=>u.id===currentUser.id?{...u,password:next}:u));
    setCurrentUser(cu=>({...cu,password:next}));
    setEditProfile(false);
    showToast("Password updated successfully 🔑");
  };
  const markPaid=()=>{
    setUsers(us=>us.map(u=>u.id===currentUser.id?{...u,paymentPaid:true}:u));
    setCurrentUser(cu=>({...cu,paymentPaid:true}));
    showToast("Payment recorded! 🎉 Your match details are now unlocked.");
  };
  const updForm=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleInterest=(id)=>setForm(f=>{
    const has=f.interests.includes(id);
    if(!has&&f.interests.length>=8)return f;
    return{...f,interests:has?f.interests.filter(x=>x!==id):[...f.interests,id]};
  });

  // ── Profile edit ──────────────────────────────────────────────────────────
  if(editProfile&&currentUser){
    const me=users.find(u=>u.id===currentUser.id)||currentUser;
    return <ProfileEdit user={me} onSave={saveProfile} onChangePassword={changePassword} onBack={()=>setEditProfile(false)} toast={toast}/>;
  }
  // ── Chat ──────────────────────────────────────────────────────────────────
  if(chatOpen&&currentUser){
    const me=users.find(u=>u.id===currentUser.id);
    const partner=me?.matchedWith?users.find(u=>u.id===me.matchedWith):null;
    if(partner)return <ChatScreen me={me} partner={partner} chats={chats} setChats={setChats} onClose={()=>setChatOpen(false)} toast={toast}/>;
  }

  // ── Landing ───────────────────────────────────────────────────────────────
  if(screen==="landing")return(
    <Wrap toast={toast}>
      <div style={{maxWidth:430,margin:"0 auto",padding:"44px 22px 70px"}}>
        <div style={{textAlign:"center",marginBottom:36,animation:"fadeUp 0.6s ease"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:10}}>
            <div style={{width:42,height:42,background:`linear-gradient(135deg,${pk},${pu})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💘</div>
            <span style={{fontSize:32,fontWeight:800,background:`linear-gradient(135deg,${pk} 0%,${bl} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-1}}>HAZE</span>
          </div>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,margin:0,letterSpacing:1}}>college students only · verified</p>
        </div>
        <div style={{textAlign:"center",marginBottom:44,animation:"fadeUp 0.6s ease 0.1s both"}}>
          <h1 style={{fontSize:38,fontWeight:800,margin:"0 0 10px",lineHeight:1.15,letterSpacing:-1}}>{greeting}</h1>
          <p style={{color:"rgba(255,255,255,0.45)",fontSize:17,margin:0}}>Anonymous. Real. Exciting. 👀</p>
        </div>
        {!permsDone?(
          <>
            <p style={{textAlign:"center",fontSize:14,color:"rgba(255,255,255,0.38)",marginBottom:22}}>We need a few things to get started ✨</p>
            {[{key:"camera",icon:"📷",title:"Camera",desc:"For your profile photo"},{key:"mic",icon:"🎤",title:"Microphone",desc:"For voice messages"},{key:"notif",icon:"🔔",title:"Notifications",desc:"So you don't miss your match — optional"}].map(({key,icon,title,desc},i)=>(
              <div key={key} className="hc" onClick={()=>reqPerm(key)} style={{...card,display:"flex",alignItems:"center",gap:16,marginBottom:12,cursor:"pointer",border:`1.5px solid ${perms[key]?gr+"60":"rgba(255,255,255,0.1)"}`,background:perms[key]?"rgba(6,214,160,0.05)":"rgba(255,255,255,0.04)",animation:`fadeUp 0.5s ease ${0.25+i*0.08}s both`}}>
                <div style={{fontSize:30,flexShrink:0}}>{icon}</div>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:15,marginBottom:3}}>{title}</div><div style={{fontSize:12,color:"rgba(255,255,255,0.38)"}}>{desc}</div></div>
                <div style={{width:26,height:26,borderRadius:"50%",flexShrink:0,background:perms[key]?gr:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,transition:"all 0.3s",color:perms[key]?"#07071a":"rgba(255,255,255,0.3)"}}>{perms[key]?"✓":"+"}</div>
              </div>
            ))}
            <div style={{height:12}}/>
            {!perms.camera||!perms.mic?(
              <div style={{textAlign:"center",padding:"12px",fontSize:13,color:"rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12}}>
                {[!perms.camera&&"Camera",!perms.mic&&"Microphone"].filter(Boolean).join(", ")} {[!perms.camera,!perms.mic].filter(Boolean).length===1?"permission":"permissions"} still needed
              </div>
            ):(
              <button onClick={()=>setPermsDone(true)} style={btn(pk)}>Continue →</button>
            )}
          </>
        ):(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <div style={{...card,textAlign:"center",marginBottom:22,padding:"28px 20px",background:"rgba(6,214,160,0.07)",border:`1.5px solid ${gr}35`}}>
              <div style={{fontSize:44,marginBottom:12,animation:"floatY 2.5s ease-in-out infinite"}}>🚀</div>
              <div style={{fontWeight:700,fontSize:18,marginBottom:6}}>Permissions sorted!</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>Join {users.length} verified students</div>
            </div>

            {/* Toggle */}
            <div style={{display:"flex",gap:6,marginBottom:20,background:"rgba(255,255,255,0.04)",padding:4,borderRadius:12}}>
              {[["signup","✨ Sign Up"],["login","👋 Log In"]].map(([id,lbl])=>(
                <button key={id} onClick={()=>setLoginMode(id==="login")} style={{flex:1,padding:"10px",border:"none",borderRadius:9,cursor:"pointer",fontFamily:FF,fontSize:13,fontWeight:600,transition:"all 0.2s",background:loginMode===(id==="login")?`linear-gradient(135deg,${pk},${pu})`:"transparent",color:loginMode===(id==="login")?"#fff":"rgba(255,255,255,0.42)"}}>
                  {lbl}
                </button>
              ))}
            </div>

            {!loginMode?(
              <>
                <button onClick={()=>setScreen("signup")} style={{...btn(pk),marginBottom:12}}>Sign Up — It's Free</button>
                <button onClick={()=>setScreen("admin")} style={btn(pu,true)}>Admin Login</button>
              </>
            ):forgotMode?(
              <div style={{animation:"fadeUp 0.3s ease"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                  <button onClick={()=>{setForgotMode(false);setForgotOtpSent(false);setForgotOtpOk(false);setForgotEmail("");setForgotOtp("");setNewPw("");setConfirmPw("");}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.45)",cursor:"pointer",fontSize:14,fontFamily:FF}}>← Back</button>
                  <span style={{fontWeight:700,fontSize:16}}>Reset Password</span>
                </div>
                {!forgotOtpOk?(
                  <>
                    <input placeholder="Your registered email" type="email" value={forgotEmail}
                      onChange={e=>setForgotEmail(e.target.value)}
                      style={{...inp,marginBottom:12}}/>
                    {!forgotOtpSent?(
                      <button onClick={handleForgotSendOtp} style={btn(pk)}>Send OTP →</button>
                    ):(
                      <>
                        <div style={{...card,marginBottom:12,background:"rgba(76,201,240,0.05)",border:`1px solid rgba(76,201,240,0.2)`,fontSize:12,color:"rgba(255,255,255,0.5)"}}>
                          📧 Check your inbox for the OTP.
                        </div>
                        <input placeholder="• • • • • •" value={forgotOtp}
                          onChange={e=>setForgotOtp(e.target.value)}
                          style={{...inp,letterSpacing:8,textAlign:"center",fontSize:22,fontWeight:700,marginBottom:12}} maxLength={6}/>
                        <button onClick={()=>{
                          if(forgotOtp===forgotGenOtp){setForgotOtpOk(true);showToast("✅ OTP verified!");}
                          else showToast("Incorrect OTP","err");
                        }} style={btn(gr)}>Verify OTP ✓</button>
                      </>
                    )}
                  </>
                ):(
                  <>
                    <div style={{textAlign:"center",color:gr,fontSize:14,marginBottom:16}}>✅ Identity verified — set your new password</div>
                    <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>New Password</label>
                    <input placeholder="At least 8 characters" type="password" value={newPw}
                      onChange={e=>setNewPw(e.target.value)}
                      style={{...inp,marginBottom:12}}/>
                    <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Confirm Password</label>
                    <input placeholder="Repeat new password" type="password" value={confirmPw}
                      onChange={e=>setConfirmPw(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&handleForgotReset()}
                      style={{...inp,marginBottom:12}}/>
                    {confirmPw&&newPw&&(
                      <div style={{fontSize:12,marginBottom:12,padding:"8px 12px",borderRadius:8,
                        background:newPw===confirmPw?"rgba(6,214,160,0.08)":"rgba(224,80,80,0.08)",
                        border:`1px solid ${newPw===confirmPw?"rgba(6,214,160,0.2)":"rgba(224,80,80,0.2)"}`,
                        color:newPw===confirmPw?gr:"#e05050"}}>
                        {newPw===confirmPw?"✓ Passwords match":"✗ Passwords don't match"}
                      </div>
                    )}
                    <button onClick={handleForgotReset} style={btn(pk)}>Reset Password 🔑</button>
                  </>
                )}
              </div>
            ):(
              <div style={{animation:"fadeUp 0.3s ease"}}>
                <input
                  placeholder="Your college email"
                  type="email"
                  value={loginForm.email}
                  onChange={e=>setLoginForm(f=>({...f,email:e.target.value}))}
                  style={{...inp,marginBottom:12}}
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={e=>setLoginForm(f=>({...f,password:e.target.value}))}
                  onKeyDown={e=>e.key==="Enter"&&handleLogin()}
                  style={{...inp,marginBottom:10}}
                />
                <div style={{textAlign:"right",marginBottom:18}}>
                  <button onClick={()=>{setForgotMode(true);setForgotEmail(loginForm.email);}} style={{background:"none",border:"none",color:pk,cursor:"pointer",fontSize:13,fontFamily:FF,fontWeight:600}}>
                    Forgot Password?
                  </button>
                </div>
                <button onClick={handleLogin} style={{...btn(pk),marginBottom:14}}>Log In →</button>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrap>
  );

  // ── Signup ────────────────────────────────────────────────────────────────
  if(screen==="signup")return(
    <Wrap toast={toast}>
      <div style={{maxWidth:430,margin:"0 auto",padding:"32px 22px 80px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:0}}>
          <button onClick={()=>{setScreen("landing");setStep(1);setOtpSent(false);setOtpOk(false);setOtp("");}} style={{background:"none",border:"none",color:"rgba(255,255,255,0.45)",cursor:"pointer",fontSize:14,padding:"0 0 20px",fontFamily:FF}}>← Back</button>
          <button onClick={()=>{setScreen("landing");setLoginMode(true);setPermsDone(true);}} style={{background:"none",border:"none",color:pk,cursor:"pointer",fontSize:13,padding:"0 0 20px",fontFamily:FF,fontWeight:600}}>Already have an account?</button>
        </div>
        <div style={{marginBottom:28}}>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[1,2,3,4].map(i=>(
              <div key={i} style={{flex:1,height:5,borderRadius:5,transition:"all 0.4s ease",background:i<step?gr:i===step?`linear-gradient(90deg,${pk},${pu})`:"rgba(255,255,255,0.09)"}}/>
            ))}
          </div>
          <h2 style={{margin:"0 0 4px",fontSize:24,fontWeight:800,letterSpacing:-0.5}}>
            {step===1?"Tell us about you":step===2?"Verify your email":step===3?"Your college":"Your vibe ✨"}
          </h2>
          <p style={{margin:0,fontSize:14,color:"rgba(255,255,255,0.38)"}}>Step {step} of 4</p>
        </div>

        {/* Step 1 — basics */}
        {step===1&&(
          <div style={{animation:"fadeUp 0.4s ease"}}>
            <input placeholder="Full Name" value={form.name} onChange={e=>updForm("name",e.target.value)} style={{...inp,marginBottom:12}}/>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.4)",margin:"0 0 10px"}}>I identify as</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {GENDER_OPTS.map(g=>(
                <div key={g} onClick={()=>updForm("gender",g)} style={{...card,textAlign:"center",cursor:"pointer",padding:"14px 10px",border:`1.5px solid ${form.gender===g?pk+"90":"rgba(255,255,255,0.09)"}`,background:form.gender===g?"rgba(247,37,133,0.08)":"rgba(255,255,255,0.035)",transition:"all 0.2s"}}>
                  <div style={{fontSize:24,marginBottom:4}}>{GENDER_ICONS[g]}</div>
                  <div style={{fontSize:13,fontWeight:form.gender===g?600:400,color:form.gender===g?"#e8e8ff":"rgba(255,255,255,0.55)"}}>{g}</div>
                </div>
              ))}
            </div>
            <input placeholder="Age" type="number" min="17" max="30" value={form.age} onChange={e=>updForm("age",e.target.value)} style={{...inp,marginBottom:22}}/>
            <button onClick={()=>{if(!form.name||!form.gender||!form.age){showToast("Fill all fields","err");return;}if(parseInt(form.age)<16){showToast("Must be 16+","err");return;}setStep(2);}} style={btn(pk)}>Next →</button>
          </div>
        )}

        {/* Step 2 — email OTP */}
        {step===2&&(
          <div style={{animation:"fadeUp 0.4s ease"}}>
            <div style={{...card,marginBottom:16,fontSize:13,color:"rgba(255,255,255,0.48)",background:"rgba(76,201,240,0.06)",border:`1px solid rgba(76,201,240,0.2)`,lineHeight:1.6}}>
              📧 Use your college email (e.g. <span style={{color:bl}}>name@college.ac.in</span>).
            </div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input placeholder="College Email" value={form.email} type="email" onChange={e=>updForm("email",e.target.value)} style={{...inp,flex:1}}/>
              <button onClick={sendOtp} style={{padding:"13px 16px",background:`linear-gradient(135deg,${bl},${pu})`,border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700,whiteSpace:"nowrap",fontFamily:FF}}>{otpSent?"Resend":"Send OTP"}</button>
            </div>
            {otpSent&&(
              <>
                <div style={{...card,marginBottom:12,background:"rgba(76,201,240,0.05)",border:"1px solid rgba(76,201,240,0.18)",fontSize:12,color:"rgba(255,255,255,0.5)"}}>
                  📧 Check your inbox (and spam folder) for the 6-digit OTP.
                </div>
                <div style={{display:"flex",gap:8,marginBottom:otpOk?0:20}}>
                  <input placeholder="• • • • • •" value={otp} onChange={e=>setOtp(e.target.value)} style={{...inp,flex:1,letterSpacing:8,textAlign:"center",fontSize:22,fontWeight:700}} maxLength={6}/>
                  <button onClick={verifyOtp} style={{padding:"13px 16px",background:`linear-gradient(135deg,${gr},${gr}bb)`,border:"none",borderRadius:12,color:"#07071a",cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:FF}}>Verify ✓</button>
                </div>
              </>
            )}
            {otpOk&&(
              <div style={{animation:"fadeUp 0.3s ease"}}>
                <div style={{textAlign:"center",padding:"10px",color:gr,fontSize:14,marginBottom:16}}>✅ Email verified!</div>
                <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Create a Password</label>
                <input
                  placeholder="At least 8 characters"
                  type="password"
                  value={form.password}
                  onChange={e=>updForm("password",e.target.value)}
                  style={{...inp,marginBottom:10}}
                />
                {form.password&&(()=>{
                  const len=form.password.length;
                  const hasUpper=/[A-Z]/.test(form.password);
                  const hasNum=/[0-9]/.test(form.password);
                  const hasSpec=/[^a-zA-Z0-9]/.test(form.password);
                  const score=[len>=8,hasUpper,hasNum,hasSpec].filter(Boolean).length;
                  const labels=["","Weak 😬","Fair 🙂","Good 👍","Strong 💪"];
                  const colors=["","#e05050",am,bl,gr];
                  return(
                    <div style={{marginBottom:12}}>
                      <div style={{display:"flex",gap:4,marginBottom:5}}>
                        {[1,2,3,4].map(i=>(
                          <div key={i} style={{flex:1,height:4,borderRadius:4,background:i<=score?colors[score]:"rgba(255,255,255,0.08)",transition:"all 0.3s"}}/>
                        ))}
                      </div>
                      <div style={{fontSize:11,color:colors[score],fontWeight:600}}>{labels[score]}</div>
                    </div>
                  );
                })()}
                <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Confirm Password</label>
                <input
                  placeholder="Repeat your password"
                  type="password"
                  value={form.confirmPassword||""}
                  onChange={e=>updForm("confirmPassword",e.target.value)}
                  style={{...inp,marginBottom:10}}
                />
                {form.confirmPassword&&form.password&&(
                  <div style={{fontSize:12,marginBottom:14,padding:"8px 12px",borderRadius:8,
                    background:form.password===form.confirmPassword?"rgba(6,214,160,0.08)":"rgba(224,80,80,0.08)",
                    border:`1px solid ${form.password===form.confirmPassword?"rgba(6,214,160,0.2)":"rgba(224,80,80,0.2)"}`,
                    color:form.password===form.confirmPassword?gr:"#e05050"}}>
                    {form.password===form.confirmPassword?"✓ Passwords match":"✗ Passwords don't match"}
                  </div>
                )}
                <button onClick={()=>{
                  if(!form.password||form.password.length<8){showToast("Password must be at least 8 characters","err");return;}
                  if(form.password!==form.confirmPassword){showToast("Passwords don't match","err");return;}
                  setStep(3);
                }} style={btn(pk)}>Next →</button>
              </div>
            )}
            <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.35)",cursor:"pointer",fontSize:13,marginTop:16,fontFamily:FF}}>← Back</button>
          </div>
        )}

        {/* Step 3 — college */}
        {step===3&&(
          <div style={{animation:"fadeUp 0.4s ease"}}>
            <select value={form.state} onChange={e=>{updForm("state",e.target.value);updForm("college","");}} style={{...inp,marginBottom:12,appearance:"none"}}>
              <option value="">Select your State</option>
              {Object.keys(COLLEGES).map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <select value={form.college} onChange={e=>updForm("college",e.target.value)} disabled={!form.state} style={{...inp,marginBottom:16,appearance:"none",opacity:form.state?1:0.4}}>
              <option value="">Select your College</option>
              {(COLLEGES[form.state]||[]).map(c=><option key={c} value={c}>{c}</option>)}
            </select>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:22}}>
              {YEAR_OPTS.map(y=>(
                <button key={y} onClick={()=>updForm("year",y)} style={{...pill(form.year===y,bl),fontFamily:FF}}>{y}</button>
              ))}
            </div>
            <button onClick={()=>{if(!form.state||!form.college){showToast("Select college","err");return;}setStep(4);}} style={btn(pk)}>Next →</button>
          </div>
        )}

        {/* Step 4 — vibe */}
        {step===4&&(
          <div style={{animation:"fadeUp 0.4s ease"}}>
            {/* Avatar pick */}
            <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:10}}>Pick your avatar</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
              {[...AVATAR_EMOJIS,...AVATAR_BIGS].slice(0,16).map(e=>(
                <button key={e} onClick={()=>updForm("avatar",e)} style={{width:44,height:44,borderRadius:12,fontSize:20,cursor:"pointer",background:form.avatar===e?"rgba(247,37,133,0.12)":"rgba(255,255,255,0.05)",border:`1.5px solid ${form.avatar===e?pk+"60":"rgba(255,255,255,0.09)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>{e}</button>
              ))}
            </div>

            {/* Bio */}
            <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Bio <span style={{color:"rgba(255,255,255,0.25)",fontWeight:400,textTransform:"none",letterSpacing:0}}>optional</span></label>
            <textarea value={form.bio} onChange={e=>updForm("bio",e.target.value)} placeholder="Tell them who you are… (max 140 chars)" maxLength={140} style={{...inp,resize:"none",minHeight:80,lineHeight:1.6,marginBottom:6}}/>
            <div style={{textAlign:"right",fontSize:11,color:"rgba(255,255,255,0.25)",marginBottom:18}}>{form.bio.length}/140</div>

            {/* Interests */}
            <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Interests <span style={{color:"rgba(255,255,255,0.25)",fontWeight:400,textTransform:"none",letterSpacing:0}}>up to 8</span></label>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
              {INTERESTS.map(i=>(
                <button key={i.id} onClick={()=>toggleInterest(i.id)} style={{...pill(form.interests.includes(i.id)),fontFamily:FF,display:"flex",alignItems:"center",gap:5}}>{i.icon} {i.label}</button>
              ))}
            </div>

            {/* Looking for */}
            <label style={{fontSize:12,color:"rgba(255,255,255,0.4)",letterSpacing:1,textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:8}}>Looking For</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:22}}>
              {LOOKING_FOR.map(lf=>(
                <button key={lf.id} onClick={()=>updForm("lookingFor",lf.id)} style={{padding:"12px",border:`1.5px solid ${form.lookingFor===lf.id?pk+"80":"rgba(255,255,255,0.09)"}`,borderRadius:12,cursor:"pointer",fontFamily:FF,fontSize:13,fontWeight:500,background:form.lookingFor===lf.id?"rgba(247,37,133,0.08)":"rgba(255,255,255,0.04)",color:form.lookingFor===lf.id?"#e8e8ff":"rgba(255,255,255,0.5)",transition:"all 0.2s",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <span style={{fontSize:22}}>{lf.icon}</span>{lf.label}
                </button>
              ))}
            </div>

            {/* Contact */}
            <div style={{height:1,background:"rgba(255,255,255,0.08)",margin:"4px 0 18px"}}/>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.38)",margin:"0 0 12px"}}>Contact info — only revealed to your match 🔐</p>
            <input placeholder="Instagram handle" value={form.instagram} onChange={e=>updForm("instagram",e.target.value)} style={{...inp,marginBottom:12}}/>
            <input placeholder="Phone number (optional)" value={form.phone} type="tel" onChange={e=>updForm("phone",e.target.value)} style={{...inp,marginBottom:22}}/>
            <button onClick={submitSignup} style={btn(pk)}>Join HAZE 💘</button>
          </div>
        )}
      </div>
    </Wrap>
  );

  // ── Home ──────────────────────────────────────────────────────────────────
  if(screen==="home"){
    const me=users.find(u=>u.id===currentUser?.id);
    const partner=me?.matchedWith?users.find(u=>u.id===me.matchedWith):null;
    const others=users.filter(u=>u.id!==currentUser?.id);
    const myKey=partner?chatKey(me.id,partner.id):null;
    const msgCount=myKey?(chats[myKey]||[]).length:0;
    const unread=myKey?(chats[myKey]||[]).filter(m=>m.senderId!==me.id).length:0;
    const lf=LOOKING_FOR.find(x=>x.id===me?.lookingFor);
    const needsPayment = partner && !me.paymentPaid;

    return(
      <Wrap toast={toast}>
        {needsPayment&&<PaymentModal onPaid={markPaid} toast={toast}/>}
        <div style={{maxWidth:480,margin:"0 auto",paddingBottom:80}}>
          {/* Sticky header */}
          <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(7,7,26,0.88)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:22,fontWeight:800,background:`linear-gradient(135deg,${pk},${bl})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:-0.5}}>HAZE 💘</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {partner&&me.paymentPaid&&(
                <button onClick={()=>setChatOpen(true)} style={{position:"relative",background:`linear-gradient(135deg,${pk},${pu})`,border:"none",borderRadius:20,padding:"7px 14px",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:FF,display:"flex",alignItems:"center",gap:6}}>
                  💬 Chat
                  {unread>0&&<span style={{position:"absolute",top:-6,right:-6,width:18,height:18,borderRadius:"50%",background:"#ff3b30",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #07071a",color:"#fff"}}>{unread>9?"9+":unread}</span>}
                </button>
              )}
              <button onClick={()=>setEditProfile(true)} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"50%",width:36,height:36,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✏️</button>
              <button onClick={()=>{setCurrentUser(null);setChatOpen(false);setEditProfile(false);setScreen("landing");setStep(1);setForm({name:"",gender:"",age:"",email:"",state:"",college:"",instagram:"",phone:"",bio:"",interests:[],year:"",lookingFor:"",avatar:"🦊",photoUrl:""});setOtpSent(false);setOtpOk(false);setOtp("");}} style={{background:"none",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.42)",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:FF}}>Logout</button>
            </div>
          </div>

          <div style={{padding:"0 20px"}}>
            {/* Bottom nav tabs */}
            <div style={{display:"flex",gap:6,margin:"16px 0",background:"rgba(255,255,255,0.04)",padding:4,borderRadius:12}}>
              {[["discover","🔍 Discover"],["myprofile","👤 My Profile"]].map(([id,lbl])=>(
                <button key={id} onClick={()=>setHomeTab(id)} style={{flex:1,padding:"10px",border:"none",borderRadius:9,cursor:"pointer",fontFamily:FF,fontSize:13,fontWeight:600,transition:"all 0.2s",background:homeTab===id?`linear-gradient(135deg,${pk},${pu})`:"transparent",color:homeTab===id?"#fff":"rgba(255,255,255,0.42)"}}>
                  {lbl}
                </button>
              ))}
            </div>

            {/* ── Discover tab ── */}
            {homeTab==="discover"&&(
              <>
                <h2 style={{fontSize:22,fontWeight:800,margin:"0 0 4px",letterSpacing:-0.5}}>Hey, {currentUser?.name?.split(" ")[0]} 👋</h2>
                <p style={{color:"rgba(255,255,255,0.38)",fontSize:14,margin:"0 0 20px"}}>{currentUser?.college} · {currentUser?.state}</p>

                {/* Match card */}
                <div style={{...card,marginBottom:24,padding:"20px",background:partner?"rgba(247,37,133,0.07)":"rgba(255,255,255,0.04)",border:`1.5px solid ${partner?pk+"40":"rgba(255,255,255,0.09)"}`}}>
                  {partner?(
                    <>
                      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                        <div style={{position:"relative"}}>
                          <Avatar user={partner} size={54}/>
                          <div style={{position:"absolute",bottom:-2,right:-2,width:18,height:18,background:gr,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>✓</div>
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:800,fontSize:18,marginBottom:3}}>You have a match! 🎉</div>
                          <div style={{fontSize:13,color:"rgba(255,255,255,0.45)"}}>{partner.gender} · {partner.college}</div>
                        </div>
                      </div>
                      {/* Partner profile preview */}
                      {partner.bio&&<p style={{fontSize:13,color:"rgba(255,255,255,0.55)",fontStyle:"italic",margin:"0 0 10px",lineHeight:1.55}}>"{partner.bio}"</p>}
                      {(partner.interests||[]).length>0&&<div style={{marginBottom:14}}><InterestTags ids={partner.interests}/></div>}

                      {me.paymentPaid?(
                        <>
                          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"12px 14px",marginBottom:14}}>
                            <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:8,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600}}>Their contact info</div>
                            {partner.instagram&&<div style={{marginBottom:6,fontSize:13,display:"flex",alignItems:"center",gap:8}}><span>📸</span><span style={{color:"rgba(255,255,255,0.45)"}}>Instagram:</span><span style={{color:bl,fontWeight:700}}>{partner.instagram}</span></div>}
                            {partner.phone&&<div style={{fontSize:13,display:"flex",alignItems:"center",gap:8}}><span>📱</span><span style={{color:"rgba(255,255,255,0.45)"}}>Phone:</span><span style={{color:gr,fontWeight:700}}>{partner.phone}</span></div>}
                          </div>
                          <button onClick={()=>setChatOpen(true)} style={{width:"100%",padding:"12px",border:"none",borderRadius:12,cursor:"pointer",background:`linear-gradient(135deg,${pk},${pu})`,color:"#fff",fontSize:14,fontWeight:700,fontFamily:FF,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                            💬 Message your match
                            {msgCount>0&&<span style={{background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"2px 10px",fontSize:12}}>{msgCount} msg{msgCount!==1?"s":""}</span>}
                          </button>
                        </>
                      ):(
                        <button onClick={()=>{}} style={{
                          width:"100%",padding:"13px",border:`1.5px solid ${am}50`,borderRadius:12,cursor:"pointer",
                          background:"rgba(255,209,102,0.07)",color:am,fontSize:14,fontWeight:700,fontFamily:FF,
                          display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                        }}>
                          🔒 Pay ₹300 to unlock contact &amp; chat
                        </button>
                      )}
                    </>
                  ):(
                    <div style={{textAlign:"center",padding:"16px 0"}}>
                      <div style={{fontSize:44,marginBottom:12,display:"inline-block",animation:"floatY 3s ease-in-out infinite"}}>⏳</div>
                      <div style={{fontWeight:700,fontSize:17,marginBottom:6}}>Waiting for your match…</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.38)",lineHeight:1.6}}>Complete your profile to stand out — and stay tuned!</div>
                      <button onClick={()=>setEditProfile(true)} style={{marginTop:14,background:`linear-gradient(135deg,${pu},${bl})`,border:"none",borderRadius:10,padding:"10px 20px",color:"#fff",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:FF}}>✏️ Edit My Profile</button>
                    </div>
                  )}
                </div>

                {/* Students feed */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <h3 style={{margin:0,fontSize:16,fontWeight:700}}>Students on HAZE</h3>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.28)",background:"rgba(255,255,255,0.05)",padding:"3px 9px",borderRadius:20,border:"1px solid rgba(255,255,255,0.08)"}}>🔒 anonymous</span>
                </div>
                {others.map(u=><ProfileCard key={u.id} user={u}/>)}
                <div style={{marginTop:20,padding:"13px 18px",background:"rgba(114,9,183,0.06)",border:"1px solid rgba(114,9,183,0.18)",borderRadius:12,fontSize:12,color:"rgba(255,255,255,0.38)",textAlign:"center",lineHeight:1.7}}>
                  🔐 Names, emails, and contact info are fully hidden. Only your match can see them.
                </div>

                {/* Customer care */}
                <div style={{marginTop:12,padding:"13px 18px",background:"rgba(76,201,240,0.05)",border:"1px solid rgba(76,201,240,0.15)",borderRadius:12,display:"flex",alignItems:"center",gap:12}}>
                  <div style={{fontSize:22,flexShrink:0}}>🎧</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.6)",marginBottom:2}}>Customer Care</div>
                    <a href="tel:8168086817" style={{fontSize:15,fontWeight:800,color:bl,textDecoration:"none",letterSpacing:0.3}}>8168086817</a>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:2}}>WhatsApp / Call · Mon–Sat, 10am–8pm</div>
                  </div>
                  <a href="https://wa.me/918168086817?text=Hi%2C+I+need+help+with+my+HAZE+account" style={{
                    background:"#25D366",border:"none",borderRadius:10,padding:"8px 13px",
                    color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none",
                    display:"flex",alignItems:"center",gap:5,flexShrink:0,fontFamily:FF,
                  }}>
                    <span style={{fontSize:14}}>💬</span> WhatsApp
                  </a>
                </div>
              </>
            )}

            {/* ── My Profile tab ── */}
            {homeTab==="myprofile"&&(
              <div style={{animation:"fadeUp 0.3s ease"}}>
                {/* Big profile header */}
                <div style={{textAlign:"center",padding:"20px 0 24px"}}>
                  <div style={{position:"relative",display:"inline-block",marginBottom:14}}>
                    <Avatar user={me} size={90}/>
                    <button onClick={()=>setEditProfile(true)} style={{position:"absolute",bottom:0,right:0,width:30,height:30,borderRadius:"50%",border:"2px solid #07071a",background:`linear-gradient(135deg,${pk},${pu})`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✏️</button>
                  </div>
                  <div style={{fontWeight:800,fontSize:22,marginBottom:4}}>{me?.name}</div>
                  <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:6}}>{me?.college} · {me?.year||me?.state}</div>
                  {lf&&<span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,padding:"5px 12px",borderRadius:20,background:"rgba(247,37,133,0.1)",color:pk,border:`1px solid ${pk}25`}}>{lf.icon} {lf.label}</span>}
                </div>

                {/* Bio */}
                <div style={{...card,marginBottom:14}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:8,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600}}>About me</div>
                  {me?.bio?<p style={{margin:0,fontSize:14,color:"rgba(255,255,255,0.7)",lineHeight:1.65,fontStyle:"italic"}}>"{me.bio}"</p>:<p style={{margin:0,fontSize:13,color:"rgba(255,255,255,0.3)",fontStyle:"italic"}}>No bio yet — <span onClick={()=>setEditProfile(true)} style={{color:pk,cursor:"pointer"}}>add one</span></p>}
                </div>

                {/* Interests */}
                <div style={{...card,marginBottom:14}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:10,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600}}>Interests</div>
                  {(me?.interests||[]).length>0?<InterestTags ids={me.interests} max={18}/>:<p style={{margin:0,fontSize:13,color:"rgba(255,255,255,0.3)",fontStyle:"italic"}}>None added — <span onClick={()=>setEditProfile(true)} style={{color:pk,cursor:"pointer"}}>pick some</span></p>}
                </div>

                {/* Details */}
                <div style={{...card,marginBottom:14}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:12,textTransform:"uppercase",letterSpacing:1.2,fontWeight:600}}>Details</div>
                  {[
                    {label:"Gender",     val:me?.gender},
                    {label:"Age",        val:me?.age},
                    {label:"Year",       val:me?.year||"—"},
                    {label:"State",      val:me?.state},
                  ].map(({label,val})=>(
                    <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                      <span style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>{label}</span>
                      <span style={{fontSize:13,fontWeight:600}}>{val}</span>
                    </div>
                  ))}
                </div>

                <button onClick={()=>setEditProfile(true)} style={btn(pk)}>✏️ Edit Profile</button>
              </div>
            )}
          </div>
        </div>
      </Wrap>
    );
  }

  // ── Admin ─────────────────────────────────────────────────────────────────
  if(screen==="admin"){
    if(!adminAuth)return(
      <Wrap toast={toast}>
        <div style={{maxWidth:400,margin:"0 auto",padding:"50px 22px"}}>
          <button onClick={()=>setScreen("landing")} style={{background:"none",border:"none",color:"rgba(255,255,255,0.42)",cursor:"pointer",fontSize:14,padding:"0 0 22px",fontFamily:FF}}>← Back</button>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${pu},#3a0ca3)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 16px"}}>👑</div>
            <h2 style={{margin:"0 0 8px",fontSize:26,fontWeight:800}}>Admin Access</h2>
            <p style={{color:"rgba(255,255,255,0.38)",fontSize:14,margin:0}}>Restricted</p>
          </div>
          <input placeholder="Admin Email" value={adminCreds.email} type="email" onChange={e=>setAdminCreds(c=>({...c,email:e.target.value}))} style={{...inp,marginBottom:12}}/>
          <input placeholder="Password" value={adminCreds.password} type="password" onChange={e=>setAdminCreds(c=>({...c,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&adminLogin()} style={{...inp,marginBottom:22}}/>
          <button onClick={adminLogin} style={btn(pu)}>Enter Admin Panel</button>
          <div style={{marginTop:18,padding:"10px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,fontSize:12,color:"rgba(255,255,255,0.3)",textAlign:"center"}}>Demo: admin@haze.app / Admin@123</div>
        </div>
      </Wrap>
    );

    const seen=new Set(),pairs=[];
    users.forEach(u=>{
      if(u.matchedWith&&!seen.has(u.id)&&!seen.has(u.matchedWith)){
        pairs.push([u,users.find(v=>v.id===u.matchedWith)].filter(Boolean));
        seen.add(u.id);seen.add(u.matchedWith);
      }
    });
    const unmatchedUsers=users.filter(u=>!u.matchedWith);

    return(
      <Wrap toast={toast}>
        <div style={{maxWidth:620,margin:"0 auto",paddingBottom:60}}>
          <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(7,7,26,0.9)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(255,255,255,0.07)",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20,fontWeight:800,background:`linear-gradient(135deg,${pu},${bl})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>HAZE</span>
              <span style={{fontSize:10,fontWeight:700,color:pu,padding:"3px 9px",background:"rgba(114,9,183,0.12)",borderRadius:20,border:`1px solid ${pu}30`,letterSpacing:1.2}}>ADMIN</span>
            </div>
            <button onClick={()=>{setAdminAuth(false);setScreen("landing");}} style={{background:"none",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.42)",padding:"6px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:FF}}>Logout</button>
          </div>

          <div style={{padding:"24px 20px"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:30}}>
              {[{label:"Total Students",val:users.length,col:bl,icon:"👥"},{label:"Active Matches",val:pairs.length,col:pk,icon:"💘"},{label:"Waiting",val:unmatchedUsers.length,col:"rgba(255,255,255,0.4)",icon:"⏳"}].map(({label,val,col,icon})=>(
                <div key={label} style={{...card,textAlign:"center",padding:"18px 10px"}}>
                  <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
                  <div style={{fontSize:30,fontWeight:800,color:col,lineHeight:1}}>{val}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:6,lineHeight:1.4}}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{display:"flex",gap:6,marginBottom:22,background:"rgba(255,255,255,0.04)",padding:4,borderRadius:12}}>
              {[["matches","💝 Matches"],["users","👥 Users"],["chats","💬 Chats"]].map(([id,lbl])=>(
                <button key={id} onClick={()=>setActiveTab(id)} style={{flex:1,padding:"10px",border:"none",borderRadius:9,cursor:"pointer",fontFamily:FF,fontSize:13,fontWeight:600,transition:"all 0.2s",background:activeTab===id?`linear-gradient(135deg,${pk},${pu})`:"transparent",color:activeTab===id?"#fff":"rgba(255,255,255,0.42)"}}>{lbl}</button>
              ))}
            </div>

            {activeTab==="matches"&&(
              <>
                <div style={{...card,marginBottom:22,border:"1px solid rgba(247,37,133,0.2)",background:"rgba(247,37,133,0.04)"}}>
                  <h3 style={{margin:"0 0 14px",fontSize:15,fontWeight:700,color:pk}}>💘 Create a New Match</h3>
                  {unmatchedUsers.length<2?(<div style={{fontSize:13,color:"rgba(255,255,255,0.4)",textAlign:"center",padding:"10px 0"}}>Not enough unmatched students.</div>):(
                    <>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                        {[0,1].map(i=>(
                          <select key={i} value={matchSel[i]} onChange={e=>setMatchSel(s=>{const n=[...s];n[i]=e.target.value;return n;})} style={{...inp,fontSize:13}}>
                            <option value="">Student {i+1}</option>
                            {unmatchedUsers.map(u=><option key={u.id} value={u.id}>{u.name} · {u.college.split(" ").slice(0,2).join(" ")}</option>)}
                          </select>
                        ))}
                      </div>
                      <button onClick={doMatch} style={btn(pk)}>💝 Match These Students</button>
                    </>
                  )}
                </div>
                {pairs.length===0?(<div style={{...card,textAlign:"center",padding:"30px",color:"rgba(255,255,255,0.3)",fontSize:14}}>No active matches yet.</div>):(
                  <>
                    <h3 style={{margin:"0 0 14px",fontSize:16,fontWeight:700}}>Active Matches ({pairs.length})</h3>
                    {pairs.map(([u1,u2])=>(
                      <div key={u1.id} style={{...card,marginBottom:10,border:"1px solid rgba(6,214,160,0.18)",background:"rgba(6,214,160,0.04)"}}>
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          <div style={{flex:1}}>
                            {[u1,u2].map((u,i)=>(
                              <div key={u.id}>
                                {i===1&&<div style={{display:"flex",alignItems:"center",gap:4,paddingLeft:4,margin:"4px 0"}}><span style={{color:pk,fontSize:16}}>♥</span><span style={{fontSize:11,color:"rgba(255,255,255,0.3)"}}>matched with</span></div>}
                                <div style={{display:"flex",alignItems:"center",gap:8}}>
                                  <Avatar user={u} size={30}/>
                                  <div><div style={{fontWeight:700,fontSize:14}}>{u.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{u.college}</div></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
                            <span style={{fontSize:11,color:gr,background:"rgba(6,214,160,0.1)",padding:"3px 9px",borderRadius:20,border:`1px solid ${gr}25`}}>{(chats[chatKey(u1.id,u2.id)]||[]).length} msgs</span>
                            <div style={{display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end"}}>
                              {[u1,u2].map(u=>(
                                <span key={u.id} style={{fontSize:10,padding:"3px 8px",borderRadius:20,fontWeight:600,
                                  background:u.paymentPaid?"rgba(6,214,160,0.1)":"rgba(255,209,102,0.1)",
                                  color:u.paymentPaid?gr:am,
                                  border:`1px solid ${u.paymentPaid?gr+"25":am+"25"}`}}>
                                  {u.name.split(" ")[0]}: {u.paymentPaid?"✓ paid":"₹ pending"}
                                </span>
                              ))}
                            </div>
                            <button onClick={()=>doUnmatch(u1.id)} style={{background:"rgba(200,40,40,0.1)",border:"1px solid rgba(200,40,40,0.25)",color:"#e05050",padding:"8px 14px",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:FF}}>Unmatch</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

            {activeTab==="users"&&(
              <>
                {/* group by college */}
                {(()=>{
                  // Build a map: college → [users]
                  const byCollege={};
                  users.forEach(u=>{
                    if(!byCollege[u.college])byCollege[u.college]=[];
                    byCollege[u.college].push(u);
                  });
                  // Sort colleges alphabetically, then by state for header colour
                  const STATE_COLOR={Punjab:bl,Himachal:gr,Jammu:am,Delhi:pk,Haryana:pu};
                  // figure out state from college name via COLLEGES map
                  const collegeState=(col)=>Object.entries(COLLEGES).find(([,list])=>list.includes(col))?.[0]||"Other";

                  return Object.entries(byCollege).sort(([a],[b])=>a.localeCompare(b)).map(([college,studs])=>{
                    const state=collegeState(college);
                    const accentColor=STATE_COLOR[state]||bl;
                    const matched=studs.filter(u=>u.matchedWith).length;
                    return(
                      <div key={college} style={{marginBottom:28}}>
                        {/* University header */}
                        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"12px 16px",
                          background:`${accentColor}10`,border:`1px solid ${accentColor}25`,borderRadius:12}}>
                          <div style={{flex:1}}>
                            <div style={{fontWeight:800,fontSize:15,color:"#e8e8ff",marginBottom:2}}>{college}</div>
                            <div style={{fontSize:11,color:"rgba(255,255,255,0.38)",display:"flex",gap:10}}>
                              <span style={{color:accentColor,fontWeight:600}}>{state}</span>
                              <span>·</span>
                              <span>{studs.length} student{studs.length!==1?"s":""}</span>
                              <span>·</span>
                              <span style={{color:matched?gr:"rgba(255,255,255,0.3)"}}>{matched} matched</span>
                            </div>
                          </div>
                          {/* Mini donut indicator */}
                          <div style={{textAlign:"center"}}>
                            <div style={{fontSize:20,fontWeight:800,color:accentColor}}>{studs.length}</div>
                            <div style={{fontSize:9,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:0.8}}>total</div>
                          </div>
                        </div>

                        {/* Student rows */}
                        {studs.map((u,idx)=>(
                          <div key={u.id} className="hc" style={{
                            display:"flex",gap:12,padding:"12px 14px",
                            background:"rgba(255,255,255,0.03)",
                            borderLeft:`3px solid ${accentColor}40`,
                            borderRight:"1px solid rgba(255,255,255,0.06)",
                            borderTop:idx===0?"1px solid rgba(255,255,255,0.06)":"none",
                            borderBottom:"1px solid rgba(255,255,255,0.06)",
                            borderTopLeftRadius:idx===0?8:0,
                            borderTopRightRadius:idx===0?8:0,
                            borderBottomLeftRadius:idx===studs.length-1?8:0,
                            borderBottomRightRadius:idx===studs.length-1?8:0,
                            transition:"background 0.2s",
                          }}>
                            <Avatar user={u} size={40}/>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                                <span style={{fontWeight:700,fontSize:14}}>{u.name}</span>
                                <span style={{fontSize:10,color:"rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.05)",padding:"2px 7px",borderRadius:10}}>{u.year||u.gender}</span>
                                {u.lookingFor&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:`${pk}15`,color:pk}}>{LOOKING_FOR.find(x=>x.id===u.lookingFor)?.icon}</span>}
                              </div>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:3}}>{u.email} · Age {u.age}</div>
                              {u.bio&&<div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>"{u.bio}"</div>}
                              {(u.interests||[]).length>0&&<div style={{marginTop:5,display:"flex",flexWrap:"wrap",gap:4}}>{INTERESTS.filter(i=>u.interests.includes(i.id)).slice(0,4).map(i=><span key={i.id} style={{fontSize:10,padding:"2px 7px",borderRadius:10,background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.5)"}}>{i.icon} {i.label}</span>)}</div>}
                            </div>
                            <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                              <div style={{fontSize:10,padding:"4px 10px",borderRadius:20,fontWeight:600,
                                background:u.matchedWith?"rgba(6,214,160,0.1)":"rgba(255,255,255,0.05)",
                                color:u.matchedWith?gr:"rgba(255,255,255,0.3)",
                                border:`1px solid ${u.matchedWith?gr+"25":"rgba(255,255,255,0.06)"}`}}>
                                {u.matchedWith?"💘 Matched":"Waiting"}
                              </div>
                              {u.instagram&&<div style={{fontSize:10,color:bl}}>{u.instagram}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  });
                })()}
              </>
            )}

            {activeTab==="chats"&&(
              <>
                <h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:700}}>All Conversations</h3>
                {pairs.length===0?(<div style={{...card,textAlign:"center",padding:"30px",color:"rgba(255,255,255,0.3)",fontSize:14}}>No matches yet.</div>):pairs.map(([u1,u2])=>{
                  const k=chatKey(u1.id,u2.id);const msgs=chats[k]||[];const last=msgs[msgs.length-1];
                  return(
                    <div key={k} style={{...card,marginBottom:10,padding:"14px 16px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:last?10:0}}>
                        <div style={{display:"flex"}}>{[u1,u2].map((u,i)=><Avatar key={u.id} user={u} size={32} style={{marginLeft:i?-10:0,border:"2px solid #07071a"}}/>)}</div>
                        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{u1.name} & {u2.name}</div><div style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>{msgs.length} message{msgs.length!==1?"s":""}</div></div>
                      </div>
                      {last?(<div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",fontSize:12,color:"rgba(255,255,255,0.5)",borderLeft:`3px solid ${pk}40`}}><span style={{color:"rgba(255,255,255,0.3)",marginRight:6}}>{last.senderId===u1.id?u1.name.split(" ")[0]:u2.name.split(" ")[0]}:</span>{last.text.length>60?last.text.slice(0,60)+"…":last.text}</div>):(<div style={{fontSize:12,color:"rgba(255,255,255,0.28)",fontStyle:"italic"}}>No messages yet</div>)}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Wrap>
    );
  }

  return null;
}
