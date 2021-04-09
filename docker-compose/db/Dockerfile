FROM ubuntu:16.04

RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN yes | apt-get -y update

RUN yes | apt-get install -y python-software-properties

RUN yes | apt-get install -y software-properties-common

RUN yes | apt-get install -y  postgresql-9.6

RUN yes | apt-get install -y  postgresql-client-9.6 

RUN yes | apt-get install -y  postgresql-contrib-9.6  

USER postgres

RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER tenpoapi WITH SUPERUSER PASSWORD 'tenpoapi';" &&\
    createdb -O tenpoapi tenpoapi

RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.6/main/pg_hba.conf

RUN echo "listen_addresses='*'" >> /etc/postgresql/9.6/main/postgresql.conf

EXPOSE 5432

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

CMD ["/usr/lib/postgresql/9.6/bin/postgres", "-D", "/var/lib/postgresql/9.6/main", "-c", "config_file=/etc/postgresql/9.6/main/postgresql.conf"]