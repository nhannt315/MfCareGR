module DoctorHelper
  def find_doctor doctors, doctor_id
    doctors.select {|doctor| doctor["id"] == doctor_id}
  end
end