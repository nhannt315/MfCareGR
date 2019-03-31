class ApplicationController < ActionController::API
  require_relative "../../lib/utilities/hash_it"
  include ToukouHelper
  include Response
  include ExceptionHandler

  private

  def authorize_request
    result = AuthorizationService.new(request.headers["Authorization"]).call
    @current_user = Hashit.new(result)
  end
end
