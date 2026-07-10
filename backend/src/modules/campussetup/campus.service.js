const Campus = require("../../models/Campus");
const ApiError = require("../../utils/ApiError");

async function createCampus(data) {
  const generatedCode = data.name.trim().toUpperCase().replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4);

  return Campus.create({
    name: data.name,
    code: generatedCode,
    address: data.address,
    contact: data.contact,
  });
}

async function listCampuses() {
  return Campus.find().sort({ createdAt: -1 });
}

async function getCampusById(id) {
  const campus = await Campus.findById(id);
  if (!campus) throw new ApiError(404, "Campus not found");
  return campus;
}

async function updateCampus(id, data) {
  const campus = await Campus.findByIdAndUpdate(
    id,
    {
      name: data.name,
      address: data.address,
      contact: data.contact,
    },
    { new: true }
  );
  if (!campus) throw new ApiError(404, "Campus not found");
  return campus;
}

async function deleteCampus(id) {
  const campus = await Campus.findByIdAndDelete(id);
  if (!campus) throw new ApiError(404, "Campus not found");
  return campus;
}

module.exports = { createCampus, listCampuses, getCampusById, updateCampus, deleteCampus };