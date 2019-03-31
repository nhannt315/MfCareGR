json.array! @medicine_classes do |medicine_class|
  json.name medicine_class.name
  json.types medicine_class.medicine_types
end
