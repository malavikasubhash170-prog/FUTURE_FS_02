require("dotenv").config();
const express=require("express"), session=require("express-session"), mongoose=require("mongoose"), path=require("path");
const app=express(), PORT=process.env.PORT||3000;
app.use(express.json());
app.use(session({secret:process.env.SESSION_SECRET||"change-this-secret",resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:"lax",maxAge:14400000}}));
const Lead=mongoose.model("Lead",new mongoose.Schema({
 name:{type:String,required:true,trim:true},email:{type:String,required:true,trim:true,lowercase:true},
 source:{type:String,default:"Website contact form"},status:{type:String,enum:["new","contacted","converted"],default:"new"},
 notes:{type:String,default:""},followUp:{type:Date,default:null},createdAt:{type:Date,default:Date.now}
}));
function auth(req,res,next){if(!req.session.loggedIn)return res.status(401).json({error:"Please log in first."});next();}
app.use(express.static(path.join(__dirname,"public")));
app.post("/api/login",(req,res)=>{if(req.body.username===(process.env.ADMIN_USERNAME||"admin")&&req.body.password===(process.env.ADMIN_PASSWORD||"ChangeMe123!")){req.session.loggedIn=true;return res.json({message:"Logged in"});}res.status(401).json({error:"Incorrect username or password."});});
app.post("/api/logout",(req,res)=>req.session.destroy(()=>res.json({message:"Logged out"})));
app.get("/api/session",(req,res)=>res.json({loggedIn:!!req.session.loggedIn}));
app.get("/api/leads",auth,async(req,res)=>{try{res.json(await Lead.find().sort({createdAt:-1}));}catch(e){res.status(500).json({error:"Could not load leads."});}});
app.post("/api/leads",auth,async(req,res)=>{try{const {name,email,source,status,notes,followUp}=req.body;if(!name?.trim()||!email?.trim())return res.status(400).json({error:"Name and email are required."});res.status(201).json(await Lead.create({name,email,source,status,notes,followUp:followUp||null}));}catch(e){res.status(400).json({error:"Could not add lead. Check the fields."});}});
app.patch("/api/leads/:id",auth,async(req,res)=>{try{const allowed=["name","email","source","status","notes","followUp"],u={};allowed.forEach(k=>{if(req.body[k]!==undefined)u[k]=req.body[k]|| (k==="followUp"?null:"");});const lead=await Lead.findByIdAndUpdate(req.params.id,u,{new:true,runValidators:true});if(!lead)return res.status(404).json({error:"Lead not found."});res.json(lead);}catch(e){res.status(400).json({error:"Could not update lead."});}});
app.delete("/api/leads/:id",auth,async(req,res)=>{try{const lead=await Lead.findByIdAndDelete(req.params.id);if(!lead)return res.status(404).json({error:"Lead not found."});res.json({message:"Deleted"});}catch(e){res.status(400).json({error:"Could not delete lead."});}});
mongoose.connect(process.env.MONGODB_URI||"mongodb://127.0.0.1:27017/future_fs_02_crm").then(()=>app.listen(PORT,()=>console.log(`Mini CRM running at http://localhost:${PORT}`))).catch(e=>{console.error("MongoDB connection failed. Start MongoDB or set MONGODB_URI in .env.");console.error(e.message);process.exit(1);});
