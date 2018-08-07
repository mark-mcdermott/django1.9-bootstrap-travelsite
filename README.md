## setup

```
 $ pip install -r requirements.txt
 $ cd backend
 $ ./manage.py makemigrations
 $ ./manage.py migrate
 $ ./manage.py createsuperuser --username bobby --email bobby@email.com
 $ ./manage.py loaddata fixtures/*.json
```
## running
```
 $ ./manage runserver > dev.log 2>&1 &  # run in the background
 $ cd ../frontend
 $ npm install
 $ npm run dev
```
## quitting
```
 $ ^C # ctrl-c to quit npm dev server
 $ fg # to bring django dev server into the foreground
 $ ^C # ctrl-c to quit django dev server
```
