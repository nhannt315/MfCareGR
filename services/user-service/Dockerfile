FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get install -y postgresql postgresql-contrib
RUN mkdir -p /user-app
WORKDIR /user-app

COPY Gemfile /user-app/Gemfile
COPY Gemfile.lock /user-app/Gemfile.lock
RUN bundle install
COPY . /user-app
EXPOSE 3000
# RUN ["chmod", "+x", "./entry.sh"]
# ENTRYPOINT [ "./entry.sh" ]
# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]


