class ApplicationController < ActionController::API

  include UserHelper
  include Response
  include ExceptionHandler

  private

  def authorize_request
    result = AuthorizationService.new(request.headers["Authorization"]).call
    @current_user = Hashit.new(result)
  end

  def authorize_admin
    puts request.headers
    result = AuthorizationService.new(request.headers["Authorization"]).call
    unless result["is_staff"]
      render json: {message: "Permission denied!"}, status: :forbidden
      return
    end
    @current_user = Hashit.new(result)
  end

  class Hashit
    def initialize(hash)
      hash.each do |k,v|
        self.instance_variable_set("@#{k}", v.is_a?(Hash) ? Hashit.new(v) : v)
        self.class.send(:define_method, k, proc{self.instance_variable_get("@#{k}")})
        self.class.send(:define_method, "#{k}=", proc{|v| self.instance_variable_set("@#{k}", v)})
      end
    end
  end
end
