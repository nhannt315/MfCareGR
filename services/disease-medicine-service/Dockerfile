FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN apt-get install -y postgresql postgresql-contrib

RUN mkdir -p /disease-medicine-app
WORKDIR /disease-medicine-app

COPY Gemfile /disease-medicine-app/Gemfile
COPY Gemfile.lock /disease-medicine-app/Gemfile.lock
RUN bundle install
COPY . /disease-medicine-app
EXPOSE 3000
# RUN ["chmod", "+x", "./entry.sh"]
# ENTRYPOINT [ "./entry.sh" ]

# CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]


