var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    path        = require("path"),
    overRide    = require("method-override"),
    app         = express();
//connect to db    
mongoose.connect("mongodb://localhost/nscdb");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(overRide("_method"));

 //show index page    
app.get("/", function(req, res){ 
    Post.find({}, function(err, allposts){
        if(err){
            console.log(err);
        }else{
            res.render("index" , {posts:allposts});
            console.log(allposts);
        }
    });
});

//add a post
app.post("/posts", function(req, res){
   var post = req.body.post;
   var image = req.body.image; 
   var otherInfo = req.body.otherInfo;
  
   var newPost = {
        post:post,
        image:image,
        otherInfo:otherInfo
   } 
   Post.create(newPost, function(err, newlyCreatedPost){
        if(err){
            console.log(err)
        }else{
            res.redirect("/");
        }
   });
});

//show posts on separate page
 app.get("/posts", function(req, res){
    Post.find({}, function(err, allposts){
        if(err){
            console.log(err);
        }else{
            res.render("posts" , {posts:allposts});
            //sconsole.log(allposts);
        }
    });
 });

//show post by id
app.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            res.redirect("/posts")
        }else{
            res.render("show", { post:foundPost});
        }
    });
});

//edit post

app.get("/posts/:id/edit", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
            if(err){
                res.redirect("/posts")
            }else{
                res.render("edit", { post:foundPost});
            }
        });
});

//update post

app.put("/posts/:id", function(req, res){
    Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, updatedPost){
        if(err){
            res.redirect("/posts")
        }else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

// delete post

app.delete("/posts/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        }else{
            res.redirect("/posts");
        }
    });
});

//new post form
app.get("/newpost", function(req, res){
    res.render("newpost.ejs");
});

//localhost
app.listen(3000, function(){
    console.log('listen to posrt 3000');
});

var postSchema = new mongoose.Schema({
    post :String,
    image: String,
    otherInfo:String,
    date:{type: Date, default : Date.now}
});

var Post =  mongoose.model("Post", postSchema);
