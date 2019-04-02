FROM python:2.7

RUN mkdir -p /app
WORKDIR /app

RUN apt-get install git

COPY . /app
RUN pip install -r requirement.txt
#RUN pip install git+https://github.com/inspirehep/magpie.git@v2.0

EXPOSE 5000

CMD ["python", "app.py"]