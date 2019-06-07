FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get install -y postgresql postgresql-contrib

RUN mkdir -p /article-app
WORKDIR /article-app

COPY Gemfile /article-app/Gemfile
COPY Gemfile.lock /article-app/Gemfile.lock
#RUN gem update --system
#RUN gem install bundler
#RUN bundler update --bundler
RUN bundle install
RUN gem install foreman
COPY . /article-app
EXPOSE 3000
# RUN ["chmod", "+x", "./entry.sh"]
# ENTRYPOINT [ "./entry.sh" ]

# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]


