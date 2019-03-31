class CommonController < ApplicationController
  def filter_data
    provinces = Province.all
    specialities = Speciality.all
    jobs = Job.all
    languages = Language.all
    ranks = Rank.all
    degrees = Degree.all

    render json: {
        provinces: provinces,
        jobs: jobs,
        specialities: specialities,
        languages: languages,
        ranks: ranks,
        degrees: degrees
    }
  end
end