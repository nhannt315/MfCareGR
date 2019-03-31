json.id @medicine_type.id
json.name @medicine_type.name
json.slug @medicine_type.slug
json.total_page (@medicine_type.medicines.count/30.to_f).ceil
json.medicines @medicines