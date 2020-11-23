warning: LF will be replaced by CRLF in ui/src/Crud.js.
The file will have its original line endings in your working directory
[1mdiff --git a/firstRestAPI/app.js b/firstRestAPI/app.js[m
[1mindex 13abb52..781f6be 100644[m
[1m--- a/firstRestAPI/app.js[m
[1m+++ b/firstRestAPI/app.js[m
[36m@@ -36,7 +36,7 @@[m [mapp.get('/', (req,res) => {[m
 [m
 //CONNECT DB[m
 mongoose.connect([m
[31m-    process.env.connectionURL,[m
[32m+[m[32m    process.env.connectionURL2,[m
     { useNewUrlParser: true, useUnifiedTopology: true }, [m
 );[m
 [m
[1mdiff --git a/ui/src/Apicaller.js b/ui/src/Apicaller.js[m
[1mindex 6d28da7..ae61e7d 100644[m
[1m--- a/ui/src/Apicaller.js[m
[1m+++ b/ui/src/Apicaller.js[m
[36m@@ -140,7 +140,7 @@[m [mexport const makeAdmin = (data) => {[m
         const res = await axios.patch(changeableUrl, data);[m
         console.log(res);[m
         if(res.data == "No need to update user"){[m
[31m-            resolve("Success");[m
[32m+[m[32m            reject("No need to update user");[m
         }[m
         else if(res.data == "Username invalid"){[m
             reject("Username Invalid");[m
[1mdiff --git a/ui/src/Crud.js b/ui/src/Crud.js[m
[1mindex c78ba4e..27a74b1 100644[m
[1m--- a/ui/src/Crud.js[m
[1m+++ b/ui/src/Crud.js[m
[36m@@ -19,14 +19,13 @@[m [mfunction Crud() {[m
   const dispatch = useDispatch();[m
 [m
   useEffect(() => {[m
[31m-    //   const interval = setInterval(() => {[m
[31m-    //     validateToken(token)[m
[31m-    //       .catch(() => {[m
[31m-    //         clearInterval(interval);[m
[31m-    //         logout();[m
[31m-    //       })[m
[31m-    //   },2000);[m
[31m-    // setIsAdmin(false);[m
[32m+[m[32m      const interval = setInterval(() => {[m
[32m+[m[32m        validateToken(token)[m
[32m+[m[32m          .catch(() => {[m
[32m+[m[32m            clearInterval(interval);[m
[32m+[m[32m            logout();[m
[32m+[m[32m          })[m
[32m+[m[32m      },2000);[m
 }, []);[m
 [m
 [m
[36m@@ -49,7 +48,6 @@[m [mfunction Crud() {[m
         <Button onClick={logout}><p className="Logoff">Logout</p></Button>[m
         <br/>[m
         <div className="Crud">[m
[31m-          {isAdmin? console.log("ture") : console.log("falsae")}[m
           {[m
             isAdmin ?[m
             <>[m
