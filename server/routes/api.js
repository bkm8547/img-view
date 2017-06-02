const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
var Image=require('../../imageModel');
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

router.post('/image', function(req, res, next) {
  var image=new Image(req.body);
  console.log(image);
  var saveImage = function() {
            var files=req.files;
            files.forEach(function(value,index){
            // console.log(value);
            // console.log(file);
            var file=value;
            console.log('--------------------------------------');
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';
            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            Image.find({ file: imgUrl }, function(err, images) {
                if (images.length > 0) {
                    saveImage();
                    console.log('image inserted');
                } else {
                    console.log(file);
                    var tempPath = file.path,
                        ext = path.extname(file.originalname).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                        console.log(ext,tempPath,targetPath);
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(tempPath, targetPath, function(err) {
                            if (err) { throw err; }
                            var newImg = new Image({
                                title: req.body.title,
                                file: imgUrl + ext
                            });
                            newImg.save(function(err, image) {
                                console.log('Successfully inserted image: ' + image.file);
                            });
                            res.redirect('/image-view/'+newImg.file);
                        });
                    } else {
                        fs.unlink(tempPath, function () {
                            if (err) throw err;
                            res.json(500, {error: 'Only image files are allowed.'});
                        });
                    }
                }
            });
        });
    }
       saveImage();
});

module.exports = router;