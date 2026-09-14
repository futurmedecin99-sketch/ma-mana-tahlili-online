/**
 * ==========================================================================
 * files-data.js — بيانات قسم الملفات
 * ==========================================================================
 *
 * لإضافة ملف جديد، أضف كائناً جديداً إلى المصفوفة filesData أدناه.
 *
 * الحقول المطلوبة:
 * -----------------------------------------------------------------------
 *   id             : رقم فريد متسلسل (زِد الرقم الأخير بمقدار 1)
 *   title          : عنوان الملف بالعربية
 *   description    : وصف مختصر (جملة أو جملتين)
 *   category       : أحد القيم التالية:
 *                    "diabetes" | "thyroid" | "kidney" | "liver" | "lipid" | "general"
 *   categoryLabel  : التسمية العربية للتصنيف (مثل: "السكري")
 *   fileType       : "pdf" | "image" | "doc" | "excel"
 *   filePath       : المسار النسبي للملف داخل مجلد files/ (مثل: "files/my-file.pdf")
 *   relatedAnalyses: مصفوفة slugs للتحاليل ذات الصلة (انظر slugs في data.js) — يمكن تركها []
 *   dateAdded      : تاريخ الإضافة بصيغة "YYYY-MM-DD"
 *   icon           : أيقونة FontAwesome مناسبة:
 *                    "fa-file-pdf" | "fa-file-image" | "fa-file-word" | "fa-file-excel"
 *                    "fa-file-medical" | "fa-file-lines"
 *
 * مثال على كائن ملف جاهز للنسخ واللصق:
 * -----------------------------------------------------------------------
 * {
 *     id: 3,
 *     title: "دليل تحاليل الكلى",
 *     description: "شرح مبسط لقراءة نتائج تحاليل الكرياتينين واليوريا.",
 *     category: "kidney",
 *     categoryLabel: "الكلى",
 *     fileType: "pdf",
 *     filePath: "files/kidney-guide.pdf",
 *     relatedAnalyses: ["creatinine", "uree"],
 *     dateAdded: "2026-10-01",
 *     icon: "fa-file-medical"
 * },
 * -----------------------------------------------------------------------
 *
 * بعد إضافة الملف هنا، ضع الملف الفعلي في مجلد files/ بنفس الاسم الموجود في filePath.
 * ثم حدّث sitemap.xml إذا أردت فهرسة الملفات الجديدة في Google.
 */

const filesData = [
    {
        id: 1,
        title: "نموذج متابعة سكر الدم اليومي",
        description: "جدول مرتب يساعدك على تسجيل قراءات سكر الدم يومياً ومشاركتها مع طبيبك لتحسين التحكم في السكري.",
        category: "diabetes",
        categoryLabel: "السكري",
        fileType: "pdf",
        filePath: "files/diabetes-daily-tracking.pdf",
        relatedAnalyses: ["hba1c", "glycemie-a-jeun"],
        dateAdded: "2026-09-14",
        icon: "fa-file-pdf"
    },
    {
        id: 2,
        title: "دليل فهم نتائج الغدة الدرقية",
        description: "شرح مبسط لنتائج تحاليل TSH وFT4 وT4، والأسئلة التي يجب طرحها على طبيبك.",
        category: "thyroid",
        categoryLabel: "الغدة الدرقية",
        fileType: "pdf",
        filePath: "files/thyroid-results-guide.pdf",
        relatedAnalyses: ["tsh", "ft4", "t4"],
        dateAdded: "2026-09-14",
        icon: "fa-file-medical"
    }
];

/* ──────────────────────────────────────────────────────────────────────────
   الدوال المساعدة — لا تعدّل هذا القسم
   ────────────────────────────────────────────────────────────────────────── */

// جلب الملفات حسب التصنيف
function getFilesByCategory(category) {
    if (!category || category === 'all') return filesData;
    return filesData.filter(f => f.category === category);
}

// جلب التصنيفات الفريدة الموجودة في البيانات الحالية
function getUniqueFileCategories() {
    const seen = new Set();
    return filesData.reduce((acc, f) => {
        if (!seen.has(f.category)) {
            seen.add(f.category);
            acc.push({ value: f.category, label: f.categoryLabel });
        }
        return acc;
    }, []);
}

// توليد HTML لبطاقة ملف واحد
function generateFileCardHTML(file) {
    const fileTypeLabel = {
        pdf: 'PDF',
        image: 'صورة',
        doc: 'Word',
        excel: 'Excel'
    }[file.fileType] || file.fileType.toUpperCase();

    const relatedLinks = file.relatedAnalyses.length > 0
        ? `<div class="file-related-links">
               <span class="file-related-label"><i class="fa-solid fa-link"></i> تحاليل ذات صلة:</span>
               ${file.relatedAnalyses.map(slug => {
                   const analysis = typeof analysesData !== 'undefined'
                       ? analysesData.find(a => a.slug === slug)
                       : null;
                   const name = analysis ? analysis.name : slug;
                   return `<a href="analysis.html?slug=${slug}" class="file-analysis-tag">${name}</a>`;
               }).join('')}
           </div>`
        : '';

    return `
        <div class="test-card file-card" data-category="${file.category}">
            <div class="card-icon">
                <i class="fa-solid ${file.icon || 'fa-file-lines'}"></i>
            </div>
            <div class="card-content">
                <div class="file-meta-row">
                    <span class="file-category-badge category-${file.category}">${file.categoryLabel}</span>
                    <span class="file-type-badge">${fileTypeLabel}</span>
                </div>
                <h3>${file.title}</h3>
                <p>${file.description}</p>
                ${relatedLinks}
                <a href="${file.filePath}" class="btn btn-primary file-download-btn" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-arrow-down-to-line"></i> فتح الملف
                </a>
            </div>
        </div>
    `;
}
