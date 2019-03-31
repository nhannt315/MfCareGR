FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get install -y postgresql postgresql-contrib
RUN mkdir -p /search-app
WORKDIR /search-app

COPY Gemfile /search-app/Gemfile
COPY Gemfile.lock /search-app/Gemfile.lock
RUN bundle install
COPY . /search-app
EXPOSE 3000
# RUN ["chmod", "+x", "./entry.sh"]
# ENTRYPOINT [ "./entry.sh" ]
# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]


