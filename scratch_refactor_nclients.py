import re
with open("components/commercial/NationalClientsView.tsx", "r", encoding="utf-8") as f:
    contents = f.read()

contents = contents.replace("ClientsView", "NationalClientsView")
contents = contents.replace("Client", "NationalClient")
contents = contents.replace("clients", "national_clients")
contents = contents.replace("client", "national_client")

# Reset initial state
contents = re.sub(
    r"const initialFormState: Omit<NationalClient, 'id'> = {.*?};",
    "const initialFormState: Omit<NationalClient, 'id'> = {\n        name: '',\n        rif: '',\n        address: '',\n        contact_name: '',\n        phone: ''\n    };",
    contents,
    flags=re.DOTALL
)

# Replace table columns and rows for NationalClient
contents = re.sub(
    r'<th className="px-4 py-2 text-left">Ubicación</th>.*?<th className="px-4 py-2 text-left">Límites / Req\.</th>',
    '<th className="px-4 py-2 text-left">Información Fiscal</th>\n                                <th className="px-4 py-2 text-left">Contacto</th>',
    contents,
    flags=re.DOTALL
)

# Table body replacements
contents = re.sub(
    r'{c\.abr \? c\.abr\.substring\(0, 2\) : \(c\.name \|\| \'\?\'\)\.substring\(0, 2\)\.toUpperCase\(\)}',
    '{(c.name || \'?\').substring(0, 2).toUpperCase()}',
    contents
)

contents = re.sub(
    r'{c\.abr && <span.*?{c\.abr}</span>}',
    '',
    contents
)

# Replace Location and Limits cells
location_pattern = r'<td className="px-4 py-3">.*?<div className="space-y-1">.*?<div className="flex items-center gap-1\.5 font-medium text-gray-700">.*?</td\s*>'
replacement_td = """<td className="px-4 py-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 font-medium text-gray-700">
                                                <FileText className="w-3 h-3 text-indigo-400" /> RIF: {c.rif || 'N/A'}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                                <MapPin className="w-3 h-3 text-gray-400" /> {c.address || 'Sin dirección'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-700">
                                                <Phone className="w-3 h-3 text-indigo-400" /> {c.phone || 'Sin télefono'}
                                            </div>
                                        </div>
                                    </td>"""

# Limit replacement hack: Because of regex complexity, I'll do a simple split & replace approach.
with open("components/commercial/NationalClientsView.tsx", "w", encoding="utf-8") as f:
    f.write(contents)
