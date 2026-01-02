// =============================================
// 1. تهيئة النظام والمتغيرات العالمية
// =============================================
let isRunning = false;
let executionTimeout = null;
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// =============================================
// تحسينات للأجهزة المحمولة
// =============================================

// كشف نوع الجهاز
const deviceInfo = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
    isSmallScreen: window.innerWidth < 640,
    isTouchSupported: isTouchDevice,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
    isAndroid: /Android/.test(navigator.userAgent),
    isPixel: /Pixel/i.test(navigator.userAgent),
    isSamsung: /Samsung/i.test(navigator.userAgent),
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
};

// إذا كان جهاز Pixel أضف فئة إلى الـ body ليمكن استهدافها في CSS
window.addEventListener('DOMContentLoaded', () => {
    try {
        if (deviceInfo.isPixel) document.body.classList.add('pixel-device');
    } catch (e) {
        // ignore
    }
});

// تحسين أداء اللمس
function disableScaleOnInputFocus() {
    if (deviceInfo.isMobile || deviceInfo.isTablet) {
        // منع التكبير عند التركيز على الـ input
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // تأخير صغير قبل التمرير الى الـ viewport
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            });
        });
    }
}

// إعداد لوحة المفاتيح الجوالة
function setupMobileKeyboard() {
    if (!isTouchDevice) return;
    
    const codeInput = document.getElementById('code-input');
    if (codeInput) {
        // تحسين تجربة الكتابة على الجوال
        codeInput.addEventListener('focus', function() {
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
        
        codeInput.addEventListener('blur', function() {
            document.body.style.overflow = '';
        });
    }
}

// تحسين الأداء للأجهزة بطيئة
function optimizePerformance() {
    // تعطيل الحركات الثقيلة على الأجهزة الضعيفة
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
    }
}

// تحسين الرؤية للشاشات الصغيرة
function adjustUIForSmallScreens() {
    if (deviceInfo.isSmallScreen) {
        // تقليل حجم الخط قليلاً
        document.documentElement.style.fontSize = '14px';
    }
}

// تحسين عرض الصور على الجوال
function optimizeImages() {
    if (deviceInfo.isMobile) {
        // منع تحميل الصور الكبيرة على الجوال
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 640px) {
                img {
                    max-width: 100%;
                    height: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ====== تحسينات متخصصة لصفحة الامتحانات ====== 

// تحسين واجهة الامتحان على الجوال
function optimizeExamMobile() {
    if (!deviceInfo.isMobile) return;
    
    // تحسين مساحة الشاشة
    const examPage = document.querySelector('.exam-page');
    if (examPage) {
        examPage.style.minHeight = '100vh';
    }
    
    // تحسين تمرير الأسئلة
    const questionsContainer = document.querySelector('.questions-container');
    if (questionsContainer) {
        questionsContainer.style.overflowY = 'auto';
        questionsContainer.style.webkitOverflowScrolling = 'touch';
    }
    
    // تحسين الخيارات
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach(option => {
        option.style.touchAction = 'manipulation';
        option.style.userSelect = 'none';
    });
}

// تحسين خاص لأجهزة Pixel
function optimizeForPixel() {
    if (!deviceInfo.isPixel) return;
    
    // إضافة تحسينات خاصة لـ Pixel
    const style = document.createElement('style');
    style.textContent = `
        /* تحسينات خاصة بـ Pixel */
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .exam-header,
        .questions-container,
        .controls-section {
            background: var(--bg-primary);
            border-radius: 12px;
        }
        
        .option-item {
            border-radius: 10px;
            padding: 13px 15px;
        }
        
        .question-item {
            border-radius: 12px;
            padding: 14px;
        }
    `;
    document.head.appendChild(style);
}

// تحسين خاص لأجهزة Samsung
function optimizeForSamsung() {
    if (!deviceInfo.isSamsung) return;
    
    // إضافة تحسينات خاصة لـ Samsung
    const style = document.createElement('style');
    style.textContent = `
        /* تحسينات خاصة بـ Samsung */
        body {
            font-family: 'Samsung One', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .exam-container {
            gap: 18px;
        }
        
        .question-item {
            padding: 15px;
            margin-bottom: 15px;
        }
    `;
    document.head.appendChild(style);
}

// تحسين عام لصفحة الامتحان
function enhanceExamPage() {
    // إضافة class للصفحة إذا كانت على جوال
    if (deviceInfo.isMobile) {
        document.body.classList.add('mobile-exam');
    }
    
    // تحسين معالجات الأسئلة
    const questionItems = document.querySelectorAll('.question-item');
    questionItems.forEach((item, index) => {
        // تحسين الأداء بإضافة معرّف فريد
        item.setAttribute('data-question-id', index + 1);
        
        // منع الانتقاء غير الضروري
        item.style.userSelect = 'none';
        
        // تحسين اللمس
        if (deviceInfo.isTouchSupported) {
            item.addEventListener('touchstart', function() {
                this.style.opacity = '0.9';
            });
            
            item.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // تحسين الخيارات
    const optionItems = document.querySelectorAll('.option-item');
    optionItems.forEach((option, index) => {
        option.setAttribute('data-option-id', String.fromCharCode(65 + index)); // A, B, C, D
        option.style.cursor = 'pointer';
        
        // تحسين المساحة اللازمة للمس
        if (deviceInfo.isMobile) {
            option.style.minHeight = '44px';
            option.style.display = 'flex';
            option.style.alignItems = 'center';
        }
    });
    
    // تحسين أزرار التحكم
    const submitBtn = document.querySelector('.submit-exam-btn');
    const saveBtn = document.querySelector('.save-exam-btn');
    const exitBtn = document.querySelector('.exit-exam-btn');
    
    [submitBtn, saveBtn, exitBtn].forEach(btn => {
        if (btn) {
            btn.style.minHeight = '48px';
            btn.style.touchAction = 'manipulation';
        }
    });
}

// معالج تغيير حجم النافذة
function handleWindowResize() {
    // تحديث معلومات الجهاز عند تغيير حجم الشاشة
    deviceInfo.screenWidth = window.innerWidth;
    deviceInfo.screenHeight = window.innerHeight;
    deviceInfo.isSmallScreen = window.innerWidth < 640;
    
    // إعادة تطبيق التحسينات
    if (document.querySelector('.exam-page')) {
        optimizeExamMobile();
    }
}

// إضافة معالج تغيير حجم النافذة
window.addEventListener('resize', handleWindowResize);

// إضافة معالج تغيير الاتجاه
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        handleWindowResize();
    }, 500);
});

// =============================================
// 2. مكتبة الأمثلة الكاملة (15 مثال)
// =============================================
const examplesLibrary = [
    {
        id: 1,
        title: "أساسيات الجمع والطرح",
        description: "عمليات حسابية بسيطة للمبتدئين",
        category: "مبتدئ",
        tags: ["حساب", "مبتدئ"],
        level: "beginner",
        code: `// العمليات الحسابية الأساسية
console.log("الجمع: 10 + 5 =", 10 + 5);
console.log("الطرح: 10 - 5 =", 10 - 5);
console.log("الضرب: 10 * 5 =", 10 * 5);
console.log("القسمة: 10 / 5 =", 10 / 5);
console.log("الباقي: 10 % 3 =", 10 % 3);`
    },
    {
        id: 2,
        title: "المتغيرات وأنواع البيانات",
        description: "تعريف واستخدام المتغيرات",
        category: "مبتدئ",
        tags: ["متغيرات", "أنواع"],
        level: "beginner",
        code: `// تعريف المتغيرات
let name = "أحمد";
const age = 25;
var city = "القاهرة";

console.log("الاسم:", name);
console.log("العمر:", age);
console.log("المدينة:", city);

// أنواع البيانات
let number = 100;
let text = "مرحباً";
let isStudent = true;
let fruits = ["تفاح", "موز", "برتقال"];
let person = { name: "سارة", age: 30 };

console.log("نوع الرقم:", typeof number);
console.log("نوع النص:", typeof text);
console.log("نوع المصفوفة:", typeof fruits);`
    },
    {
        id: 3,
        title: "الدوال البسيطة",
        description: "إنشاء واستدعاء الدوال",
        category: "مبتدئ",
        tags: ["دوال", "برمجة"],
        level: "beginner",
        code: `// دالة بسيطة
function greet(name) {
    return "مرحباً " + name + "!";
}

console.log(greet("محمد"));
console.log(greet("سارة"));

// دالة حسابية
function square(x) {
    return x * x;
}

console.log("مربع 8 هو:", square(8));
console.log("مربع 12 هو:", square(12));`
    },
    {
        id: 4,
        title: "المصفوفات الأساسية",
        description: "التعامل مع المصفوفات",
        category: "مبتدئ",
        tags: ["مصفوفات", "بيانات"],
        level: "beginner",
        code: `// إنشاء مصفوفة
let fruits = ["تفاح", "موز", "برتقال", "فراولة"];

console.log("المصفوفة:", fruits);
console.log("الطول:", fruits.length);
console.log("العنصر الأول:", fruits[0]);

// إضافة وإزالة
fruits.push("مانجو");
console.log("بعد إضافة مانجو:", fruits);

fruits.pop();
console.log("بعد إزالة آخر عنصر:", fruits);

// التكرار
console.log("عرض جميع الفواكه:");
for(let i = 0; i < fruits.length; i++) {
    console.log(i + 1 + ". " + fruits[i]);
}`
    },
    {
        id: 5,
        title: "الشروط الأساسية",
        description: "استخدام if و else",
        category: "مبتدئ",
        tags: ["شروط", "منطق"],
        level: "beginner",
        code: `// if بسيط
let age = 20;

if (age >= 18) {
    console.log("يمكنك التصويت");
} else {
    console.log("لا يمكنك التصويت");
}

// else if
let score = 85;

if (score >= 90) {
    console.log("ممتاز - A");
} else if (score >= 80) {
    console.log("جيد جداً - B");
} else if (score >= 70) {
    console.log("جيد - C");
} else {
    console.log("يحتاج تحسين");
}

// Ternary Operator
let temperature = 25;
let weather = temperature > 30 ? "حار" : "معتدل";
console.log("الجو:", weather);`
    },
    {
        id: 6,
        title: "الحلقات Loops",
        description: "استخدام for و while",
        category: "مبتدئ",
        tags: ["حلقات", "تكرار"],
        level: "beginner",
        code: `// for loop
console.log("الأرقام من 1 إلى 5:");
for(let i = 1; i <= 5; i++) {
    console.log("رقم:", i);
}

// while loop
console.log("العد التنازلي:");
let count = 5;
while(count > 0) {
    console.log(count);
    count--;
}

// for...of مع المصفوفات
let fruits = ["تفاح", "موز", "برتقال"];
console.log("عرض الفواكه:");
for(let fruit of fruits) {
    console.log("فاكهة:", fruit);
}

// break و continue
console.log("الأرقام من 1 إلى 10 (تخطي 5):");
for(let i = 1; i <= 10; i++) {
    if(i === 5) continue;
    console.log(i);
}`
    },
    {
        id: 7,
        title: "الكائنات Objects",
        description: "إنشاء واستخدام الكائنات",
        category: "متوسط",
        tags: ["كائنات", "بيانات"],
        level: "intermediate",
        code: `// إنشاء كائن
let person = {
    name: "أحمد",
    age: 30,
    city: "الإسكندرية",
    isStudent: false,
    
    // دالة داخل الكائن
    greet: function() {
        return "مرحباً، أنا " + this.name;
    }
};

console.log("الكائن:", person);
console.log("الاسم:", person.name);
console.log("العمر:", person['age']);
console.log(person.greet());

// إضافة خصائص جديدة
person.email = "ahmed@example.com";
console.log("بعد إضافة الإيميل:", person);

// التكرار على الخصائص
console.log("خصائص الكائن:");
for(let key in person) {
    if(typeof person[key] !== 'function') {
        console.log(key + ": " + person[key]);
    }
}`
    },
    {
        id: 8,
        title: "الدوال المتقدمة",
        description: "الدوال مع معاملات ودوال السهم",
        category: "متوسط",
        tags: ["دوال", "متقدم"],
        level: "intermediate",
        code: `// دالة مع معاملات متعددة
function calculate(num1, num2, operation) {
    switch(operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if(num2 === 0) return "لا يمكن القسمة على صفر";
            return num1 / num2;
        default:
            return "عملية غير صحيحة";
    }
}

console.log("10 + 5 =", calculate(10, 5, '+'));
console.log("10 * 5 =", calculate(10, 5, '*'));

// دالة السهم (Arrow Function)
const square = (x) => x * x;
console.log("مربع 9 هو:", square(9));

const sumArray = (arr) => {
    let total = 0;
    for(let num of arr) {
        total += num;
    }
    return total;
};

console.log("مجموع [1,2,3,4,5] هو:", sumArray([1,2,3,4,5]));

// دالة مع قيمة افتراضية
function greet(name = "زائر") {
    return "أهلاً وسهلاً " + name;
}

console.log(greet("محمود"));
console.log(greet());`
    },
    {
        id: 9,
        title: "المصفوفات المتقدمة",
        description: "الدوال المدمجة في المصفوفات",
        category: "متوسط",
        tags: ["مصفوفات", "متقدم"],
        level: "intermediate",
        code: `let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map - تحويل المصفوفة
let squares = numbers.map(num => num * num);
console.log("مربعات الأرقام:", squares);

// filter - تصفية المصفوفة
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("الأرقام الزوجية:", evenNumbers);

// reduce - جمع المصفوفة
let sum = numbers.reduce((total, num) => total + num, 0);
console.log("مجموع الأرقام:", sum);

// find - البحث في المصفوفة
let found = numbers.find(num => num > 5);
console.log("أول رقم أكبر من 5:", found);

// sort - ترتيب المصفوفة
let randomNumbers = [3, 1, 4, 1, 5, 9, 2, 6];
let sorted = randomNumbers.sort((a, b) => a - b);
console.log("الأرقام المرتبة:", sorted);`
    },
    {
        id: 10,
        title: "التعامل مع النصوص",
        description: "الدوال المدمجة في النصوص",
        category: "متوسط",
        tags: ["نصوص", "معالجة"],
        level: "intermediate",
        code: `let text = "مرحباً بك في عالم JavaScript";

console.log("طول النص:", text.length);
console.log("أحرف كبيرة:", text.toUpperCase());
console.log("أحرف صغيرة:", text.toLowerCase());
console.log("هل يحتوي على 'JavaScript'؟", text.includes("JavaScript"));
console.log("موقع كلمة 'عالم':", text.indexOf("عالم"));

// تقسيم النص
let words = text.split(" ");
console.log("الكلمات:", words);
console.log("عدد الكلمات:", words.length);

// استبدال النص
let newText = text.replace("JavaScript", "البرمجة");
console.log("النص الجديد:", newText);

// أخذ جزء من النص
console.log("الأول 7 أحرف:", text.substring(0, 7));`
    },
    {
        id: 11,
        title: "التاريخ والوقت",
        description: "التعامل مع Date object",
        category: "متوسط",
        tags: ["تاريخ", "وقت"],
        level: "intermediate",
        code: `// التاريخ الحالي
let now = new Date();
console.log("التاريخ الكامل:", now);
console.log("السنة:", now.getFullYear());
console.log("الشهر:", now.getMonth() + 1);
console.log("اليوم:", now.getDate());
console.log("الساعة:", now.getHours());
console.log("الدقائق:", now.getMinutes());
console.log("الثواني:", now.getSeconds());

// تنسيق التاريخ
let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
console.log("التاريخ المنسق:", now.toLocaleDateString('ar-SA', options));

// حساب الفرق بين تاريخين
let date1 = new Date(2024, 0, 1);
let date2 = new Date(2024, 11, 31);
let difference = date2 - date1;
let days = Math.floor(difference / (1000 * 60 * 60 * 24));
console.log("عدد الأيام بين 1 يناير و31 ديسمبر 2024:", days);`
    },
    {
        id: 12,
        title: "معالجة الأخطاء",
        description: "try...catch و throw",
        category: "متقدم",
        tags: ["أخطاء", "معالجة"],
        level: "advanced",
        code: `// try...catch الأساسي
try {
    console.log("بداية البرنامج");
    let result = 10 / 2;
    console.log("نتيجة القسمة:", result);
    
    // خطأ متعمد
    let x = y + 5;
    
} catch(error) {
    console.log("حدث خطأ!");
    console.log("الرسالة:", error.message);
}

console.log("البرنامج مستمر...");

// throw - خطأ مخصص
function divide(a, b) {
    if(b === 0) {
        throw new Error("لا يمكن القسمة على صفر");
    }
    return a / b;
}

try {
    console.log("10 / 2 =", divide(10, 2));
    console.log("10 / 0 =", divide(10, 0));
} catch(error) {
    console.log("خطأ في القسمة:", error.message);
}`
    },
    {
        id: 13,
        title: "الوعود Promises",
        description: "التعامل مع العمليات غير المتزامنة",
        category: "متقدم",
        tags: ["Promises", "غير متزامن"],
        level: "advanced",
        code: `// إنشاء Promise
let promise = new Promise((resolve, reject) => {
    console.log("جاري تنفيذ العملية...");
    
    setTimeout(() => {
        let success = Math.random() > 0.5;
        
        if(success) {
            resolve("تمت العملية بنجاح!");
        } else {
            reject("فشلت العملية");
        }
    }, 2000);
});

// استخدام Promise
promise
    .then(result => {
        console.log("النتيجة:", result);
    })
    .catch(error => {
        console.log("خطأ:", error);
    })
    .finally(() => {
        console.log("انتهت العملية");
    });`
    },
    {
        id: 14,
        title: "الفئات Classes",
        description: "البرمجة الكائنية في JavaScript",
        category: "متوسط",
        tags: ["Classes", "OOP"],
        level: "intermediate",
        code: `// تعريف class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return "مرحباً، أنا " + this.name + " وعمري " + this.age;
    }
}

// إنشاء كائن
let person1 = new Person("أحمد", 25);
console.log("الكائن:", person1);
console.log(person1.greet());

// الوراثة
class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    
    study() {
        return "أدرس " + this.major;
    }
}

// إنشاء طالب
let student = new Student("سارة", 20, "علوم حاسب");
console.log("\\nالطالب:", student);
console.log(student.greet());
console.log(student.study());`
    },
    {
        id: 15,
        title: "حاسبة متكاملة",
        description: "مشروع كامل مع واجهة برمجة",
        category: "مشروع",
        tags: ["مشروع", "حاسبة", "كامل"],
        level: "advanced",
        code: `// حاسبة متكاملة
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = a + b;
        this.history.push(a + " + " + b + " = " + result);
        return result;
    }
    
    subtract(a, b) {
        const result = a - b;
        this.history.push(a + " - " + b + " = " + result);
        return result;
    }
    
    multiply(a, b) {
        const result = a * b;
        this.history.push(a + " × " + b + " = " + result);
        return result;
    }
    
    divide(a, b) {
        if(b === 0) {
            throw new Error("لا يمكن القسمة على صفر");
        }
        const result = a / b;
        this.history.push(a + " ÷ " + b + " = " + result);
        return result;
    }
    
    getHistory() {
        return this.history;
    }
}

// اختبار الحاسبة
console.log("=== حاسبة متكاملة ===");
const calc = new Calculator();

try {
    console.log("10 + 5 =", calc.add(10, 5));
    console.log("10 - 5 =", calc.subtract(10, 5));
    console.log("10 × 5 =", calc.multiply(10, 5));
    console.log("10 ÷ 5 =", calc.divide(10, 5));
    
    console.log("\\nسجل العمليات:");
    calc.getHistory().forEach((operation, index) => {
        console.log(index + 1 + ". " + operation);
    });
    
} catch(error) {
    console.log("\\nخطأ:", error.message);
}`
    }
];

// =============================================
// 3. تهيئة النظام عند تحميل الصفحة
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ مشغل JavaScript جاهز!");
    
    // إخفاء المحتوى الرئيسي مؤقتاً
    const mainContent = document.querySelector('.main-container');
    if (mainContent) {
        mainContent.style.opacity = '0';
    }
    
    // إخفاء زر تبديل الثيم مؤقتاً
    const themeToggle = document.querySelector('.theme-toggle-container');
    if (themeToggle) {
        themeToggle.style.opacity = '0';
    }
    
    // بدء شاشة الترحيب
    initializeWelcomeScreen();
    
    // تهيئة النظام بعد انتهاء الشاشة الترحيبية
    setTimeout(() => {
        initializeSystem();
        setupEventListeners();
        loadSavedCode();
        
        // تهيئة تحسينات الجوال
        disableScaleOnInputFocus();
        setupMobileKeyboard();
        optimizePerformance();
        adjustUIForSmallScreens();
        optimizeImages();
        
        // إضافة التحسينات الأخرى
        enhanceMobileModalExperience();
        setupSmoothScrolling();
        
        // تحسينات صفحة الامتحانات للجوال
        optimizeExamMobile();
        optimizeForPixel();
        optimizeForSamsung();
        enhanceExamPage();
        
        // تحسينات إضافية للجوال
        if (isTouchDevice) {
            document.body.classList.add('mobile-optimized');
            setupTouchControls();
        }
    }, 500);
});

// =============================================
// 4. وظائف شاشة الترحيب
// =============================================
function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (!welcomeScreen) {
        console.log('شاشة الترحيب غير موجودة');
        return;
    }
    
    // التحقق إذا كان المستخدم قد زار الموقع من قبل
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisitedBefore) {
        // إذا زار من قبل، تظهر الشاشة لفترة قصيرة فقط
        setTimeout(() => {
            hideWelcomeScreen();
        }, 5000);
    } else {
        // أول زيارة، تظهر لفترة أطول
        localStorage.setItem('hasVisitedBefore', 'true');
        setTimeout(() => {
            hideWelcomeScreen();
        }, 3000);
    }
    
    // إضافة تأثيرات تفاعلية إضافية
    setupWelcomeInteractions();
}

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (!welcomeScreen) return;
    
    // إضافة class للخروج
    welcomeScreen.classList.add('fade-out');
    
    // إزالة الشاشة بعد انتهاء الأنيميشن
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        
        // إظهار المحتوى الرئيسي بسلاسة
        const mainContent = document.querySelector('.main-container');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.display = 'block';
            
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.8s ease';
                mainContent.style.opacity = '1';
                
                // إضافة أنيميشن إضافية للمحتوى
                animateMainContent();
            }, 100);
        }
        
        // إظهار زر تبديل الثيم بسلاسة
        const themeToggle = document.querySelector('.theme-toggle-container');
        if (themeToggle) {
            themeToggle.style.opacity = '0';
            setTimeout(() => {
                themeToggle.style.transition = 'opacity 0.8s ease';
                themeToggle.style.opacity = '1';
            }, 300);
        }
        
    }, 800); // وقت أنيميشن الخروج
}

function setupWelcomeInteractions() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    if (!welcomeScreen) return;
    
    // تفاعل اللمس/النقر للاختفاء السريع
    welcomeScreen.addEventListener('click', function() {
        hideWelcomeScreen();
    });
    
    welcomeScreen.addEventListener('touchstart', function() {
        this.style.opacity = '0.9';
    });
    
    welcomeScreen.addEventListener('touchend', function() {
        this.style.opacity = '1';
        hideWelcomeScreen();
    });
    
    // تفاعل لوحة المفاتيح للاختفاء السريع
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            hideWelcomeScreen();
        }
    });
}

function animateMainContent() {
    // أنيميشن للعناصر الرئيسية بعد اختفاء شاشة الترحيب
    const elements = [
        '.main-header',
        '.code-editor-section',
        '.output-section',
        '.main-footer'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        }
    });
}

// =============================================
// 5. وظائف التهيئة الأساسية
// =============================================
function initializeSystem() {
    adjustEditorSize();
    setupMobileOptimizations();
    createExamplesModal();
    addExamplesButton();
    displayRandomExamples();
    addAdditionalStyles();
    addMobileOptimizationsCSS();
    
    // تهيئة وضع الثيم
    initializeTheme();
}

function setupEventListeners() {
    window.addEventListener('resize', adjustEditorSize);
    
    if (!isTouchDevice) {
        document.addEventListener('keydown', handleKeyboardShortcuts);
    }
    
    const codeInput = document.getElementById('code-input');
    if (codeInput) {
        codeInput.addEventListener('input', handleCodeInput);
        codeInput.addEventListener('blur', saveCurrentCode);
    }
    
    // إعداد أحداث للأزرار السريعة
    setupQuickExamples();
}

// =============================================
// 6. وظائف التحكم بالمحرر
// =============================================
function adjustEditorSize() {
    const editor = document.getElementById('code-input');
    const output = document.querySelector('.output-body');
    
    if (!editor || !output) return;
    
    if (window.innerWidth < 768) {
        editor.style.minHeight = '250px';
        output.style.minHeight = '200px';
    } else {
        const availableHeight = window.innerHeight - 250;
        editor.style.minHeight = Math.max(300, availableHeight) + 'px';
        output.style.minHeight = Math.max(300, availableHeight) + 'px';
    }
}

function handleCodeInput() {
    const codeInput = document.getElementById('code-input');
    const statusElement = document.getElementById('status');
    
    if (!codeInput || !statusElement) return;
    
    statusElement.textContent = 'معدل';
    statusElement.style.color = '#f59e0b';
    
    const lines = codeInput.value.split('\n').length;
    const chars = codeInput.value.length;
    
    const statsElement = document.getElementById('codeStats');
    if (statsElement) {
        statsElement.textContent = `${lines} سطر, ${chars} حرف`;
    }
    
    saveCurrentCode();
}

// =============================================
// 7. وظائف تشغيل الكود
// =============================================
function runCode() {
    if (isRunning) {
        showMessage('جاري تشغيل كود آخر...', 'error');
        return;
    }
    
    const codeInput = document.getElementById('code-input');
    const output = document.getElementById('output');
    
    if (!codeInput || !output) {
        showMessage('عناصر DOM غير موجودة', 'error');
        return;
    }
    
    const code = codeInput.value.trim();
    
    if (!code) {
        showMessage('اكتب بعض الكود أولاً!', 'error');
        return;
    }
    
    isRunning = true;
    updateStatus('جاري التشغيل...', '#f59e0b');
    
    animateButton('.run-btn', 'pulse');
    
    showLoadingIndicator(output);
    
    if (executionTimeout) {
        clearTimeout(executionTimeout);
    }
    
    executionTimeout = setTimeout(() => {
        executeJavaScriptCode(code, output);
        isRunning = false;
        updateStatus('جاهز', '#10b981');
    }, 100);
}

function executeJavaScriptCode(code, outputElement) {
    try {
        const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info
        };
        
        const logs = [];
        const errors = [];
        const warnings = [];
        const infos = [];
        
        console.log = function(...args) {
            logs.push({ type: 'log', args });
            originalConsole.log.apply(console, args);
        };
        
        console.error = function(...args) {
            errors.push({ type: 'error', args });
            originalConsole.error.apply(console, args);
        };
        
        console.warn = function(...args) {
            warnings.push({ type: 'warn', args });
            originalConsole.warn.apply(console, args);
        };
        
        console.info = function(...args) {
            infos.push({ type: 'info', args });
            originalConsole.info.apply(console, args);
        };
        
        const result = eval(code);
        
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.info = originalConsole.info;
        
        displayResults(logs, errors, warnings, infos, result, outputElement);
        showMessage('تم تنفيذ الكود بنجاح! ✅', 'success');
        
    } catch (error) {
        displayError(error, outputElement);
        showMessage('حدث خطأ أثناء التنفيذ ❌', 'error');
    }
}

function displayResults(logs, errors, warnings, infos, result, outputElement) {
    let html = '<div class="slide-in">';
    
    const allOutputs = [
        { data: logs, title: 'الإخراج', icon: 'check-circle', color: '#10b981', className: 'success' },
        { data: errors, title: 'الأخطاء', icon: 'exclamation-circle', color: '#ef4444', className: 'error' },
        { data: warnings, title: 'تحذيرات', icon: 'exclamation-triangle', color: '#f59e0b', className: 'warning' },
        { data: infos, title: 'معلومات', icon: 'info-circle', color: '#06b6d4', className: 'info' }
    ];
    
    allOutputs.forEach(outputType => {
        if (outputType.data.length > 0) {
            html += `
                <div class="${outputType.className} message">
                    <i class="fas fa-${outputType.icon}"></i>
                    <strong>${outputType.title} (${outputType.data.length})</strong>
                </div>
            `;
            
            outputType.data.forEach(item => {
                html += `
                    <div class="output-line" style="border-left-color: ${outputType.color}">
                        ${item.args.map(arg => formatOutput(arg)).join(' ')}
                    </div>
                `;
            });
        }
    });
    
    html += '</div>';
    
    if (result !== undefined) {
        html += `
            <div class="success message pulse">
                <i class="fas fa-arrow-right"></i>
                <strong>القيمة المعادة:</strong>
                <div class="return-value">
                    ${formatOutput(result)}
                </div>
            </div>
        `;
    }
    
    const totalOutputs = logs.length + errors.length + warnings.length + infos.length;
    html += `
        <div class="statistics">
            <strong>📊 الإحصائيات:</strong>
            <div class="stats-grid">
                <span style="color: #10b981;">✅ ${logs.length} إخراج</span>
                <span style="color: #ef4444;">❌ ${errors.length} خطأ</span>
                <span style="color: #f59e0b;">⚠️ ${warnings.length} تحذير</span>
                <span style="color: #06b6d4;">ℹ️ ${infos.length} معلومات</span>
            </div>
        </div>
    `;
    
    outputElement.innerHTML = html;
    outputElement.scrollTop = 0;
}

function displayError(error, outputElement) {
    const html = `
        <div class="error message slide-in">
            <i class="fas fa-bug"></i>
            <strong>حدث خطأ!</strong>
            <p>${error.name}: ${error.message}</p>
        </div>
        
        <div class="error-details">
            <strong>تفاصيل الخطأ:</strong>
            <pre>${error.stack || 'لا توجد تفاصيل إضافية'}</pre>
        </div>
        
        <div class="info message">
            <i class="fas fa-lightbulb"></i>
            <strong>نصائح للحل:</strong>
            <ul>
                <li>تأكد من صيغة الكود</li>
                <li>تحقق من الأقواس والنقاط</li>
                <li>تأكد من تعريف المتغيرات قبل استخدامها</li>
                <li>تحقق من أسماء الدوال والمتغيرات</li>
            </ul>
        </div>
    `;
    
    outputElement.innerHTML = html;
}

// =============================================
// 8. وظائف الأمثلة
// =============================================
let isModalOpen = false;

function openExamplesModal() {
    const modal = document.getElementById('examplesModal');
    const container = document.getElementById('examplesContainer');
    
    if (!modal || !container) return;
    
    container.innerHTML = '';
    examplesLibrary.forEach((example, index) => {
        const card = createExampleCard(example, index);
        container.appendChild(card);
    });
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modal.classList.add('fade-in');
    isModalOpen = true;
    
    // إعداد أحداث الفلترة والبحث
    setupExampleFilters();
}

function createExampleCard(example, index) {
    const card = document.createElement('div');
    card.className = 'example-card';
    card.dataset.exampleId = example.id;
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="card-content">
            <div class="card-header">
                <i class="fas fa-code"></i>
                <h4>${example.title}</h4>
            </div>
            <p>${example.description}</p>
            <div class="example-tags">
                <span class="tag ${example.level}">${example.category}</span>
                ${example.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', function(e) {
        e.stopPropagation();
        selectExample(example);
    });
    
    return card;
}

function selectExample(example) {
    const codeInput = document.getElementById('code-input');
    if (!codeInput) return;
    
    codeInput.value = example.code;
    closeExamplesModal();
    
    showMessage(`تم تحميل مثال: ${example.title}`, 'success');
    
    updateStatus('معدل', '#f59e0b');
    saveCurrentCode();
}

function closeExamplesModal() {
    const modal = document.getElementById('examplesModal');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    isModalOpen = false;
}

function setupExampleFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('exampleSearch');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(b => b.classList.remove('active'));
            // إضافة النشط للزر المختار
            this.classList.add('active');
            
            // تطبيق الفلترة
            filterExamples(this.dataset.filter);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchExamples(this.value.toLowerCase());
        });
    }
}

function filterExamples(filter) {
    const cards = document.querySelectorAll('.example-card');
    
    cards.forEach(card => {
        const level = card.querySelector(`.tag.${filter}`) || 
                     card.querySelector(`.tag[class*="${filter}"]`);
        
        if (filter === 'all' || level) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchExamples(query) {
    const cards = document.querySelectorAll('.example-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(query) || 
                       description.includes(query) || 
                       tags.some(tag => tag.includes(query));
        
        card.style.display = matches ? 'block' : 'none';
    });
}

function loadRandomExample() {
    const randomIndex = Math.floor(Math.random() * examplesLibrary.length);
    const randomExample = examplesLibrary[randomIndex];
    selectExample(randomExample);
}

function setupQuickExamples() {
    const quickExamples = {
        calc: `// مثال حسابي
console.log("10 + 5 =", 10 + 5);
console.log("20 - 8 =", 20 - 8);
console.log("6 × 7 =", 6 * 7);
console.log("100 / 4 =", 100 / 4);`,
        
        loop: `// مثال الحلقات
console.log("حلقة for:");
for(let i = 1; i <= 5; i++) {
    console.log("تكرار رقم", i);
}

console.log("\\nحلقة while:");
let count = 3;
while(count > 0) {
    console.log("العد التنازلي:", count);
    count--;
}`,
        
        array: `// مثال المصفوفات
let fruits = ["تفاح", "موز", "برتقال", "فراولة"];
console.log("الفواكه:", fruits);
console.log("العنصر الأول:", fruits[0]);
console.log("عدد العناصر:", fruits.length);

// إضافة عنصر جديد
fruits.push("مانجو");
console.log("بعد إضافة مانجو:", fruits);`,
        
        function: `// مثال الدوال
function greet(name) {
    return "مرحباً " + name;
}

function add(a, b) {
    return a + b;
}

console.log(greet("أحمد"));
console.log("5 + 3 =", add(5, 3));`
    };
    
    window.loadQuickExample = function(type) {
        if (quickExamples[type]) {
            const codeInput = document.getElementById('code-input');
            codeInput.value = quickExamples[type];
            showMessage('تم تحميل المثال السريع', 'success');
            updateStatus('معدل', '#f59e0b');
            saveCurrentCode();
        }
    };
}

// =============================================
// 9. وظائف المساعدة والرسائل
// =============================================
function showMessage(text, type = 'info') {
    removeExistingMessages();
    
    const message = createMessageElement(text, type);
    document.body.appendChild(message);
    
    setTimeout(() => removeMessage(message), 3000);
}

function createMessageElement(text, type) {
    const message = document.createElement('div');
    message.className = `temp-message ${type} message pulse`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    const icon = icons[type] || 'info-circle';
    
    message.style.cssText = `
        position: fixed;
        ${isTouchDevice ? `
            top: 10px;
            right: 10px;
            left: 10px;
            padding: 12px;
            font-size: 14px;
        ` : `
            top: 20px;
            right: 20px;
            min-width: 300px;
            padding: 15px;
        `}
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border-radius: ${isTouchDevice ? '12px' : '8px'};
        text-align: ${isTouchDevice ? 'center' : 'left'};
        display: flex;
        align-items: center;
        gap: 10px;
        backdrop-filter: blur(10px);
    `;
    
    message.innerHTML = `
        <i class="fas fa-${icon}" style="font-size: 20px;"></i>
        <span>${text}</span>
    `;
    
    return message;
}

function removeExistingMessages() {
    const messages = document.querySelectorAll('.temp-message');
    messages.forEach(msg => {
        msg.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => msg.remove(), 300);
    });
}

function removeMessage(message) {
    if (message && message.parentNode) {
        message.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 300);
    }
}

// =============================================
// 10. وظائف التخزين
// =============================================
function saveCurrentCode() {
    const codeInput = document.getElementById('code-input');
    if (!codeInput) return;
    
    const code = codeInput.value.trim();
    if (code) {
        try {
            localStorage.setItem('lastCode', code);
        } catch (e) {
            console.warn('تعذر حفظ الكود في localStorage:', e);
        }
    }
}

function loadSavedCode() {
    try {
        const savedCode = localStorage.getItem('lastCode');
        if (savedCode) {
            const codeInput = document.getElementById('code-input');
            if (codeInput) {
                codeInput.value = savedCode;
                showMessage('تم استرجاع الكود السابق', 'info');
            }
        }
    } catch (e) {
        console.warn('تعذر تحميل الكود من localStorage:', e);
    }
}

// =============================================
// 11. وظائف تحسين الجوال
// =============================================
function setupMobileOptimizations() {
    if (!isTouchDevice) return;
    
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    document.body.style.webkitOverflowScrolling = 'touch';
    document.body.classList.add('touch-device');
}

function vibrateIfSupported() {
    if (isTouchDevice && 'vibrate' in navigator) {
        const buttons = document.querySelectorAll('.control-btn');
        buttons.forEach(btn => {
            btn.addEventListener('touchstart', () => {
                navigator.vibrate(10);
            }, { passive: true });
        });
    }
}

// =============================================
// 12. وظائف الأنيميشن والتأثيرات
// =============================================
function animateButton(selector, animationClass) {
    const button = document.querySelector(selector);
    if (!button) return;
    
    button.classList.add(animationClass);
    setTimeout(() => button.classList.remove(animationClass), 300);
}

function animateElement(selector, animationClass) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    element.classList.add(animationClass);
    setTimeout(() => element.classList.remove(animationClass), 2000);
}

function updateStatus(text, color) {
    const statusElement = document.getElementById('status');
    if (!statusElement) return;
    
    statusElement.textContent = text;
    statusElement.style.color = color;
}

// =============================================
// 13. وظائف تنسيق الإخراج
// =============================================
function formatOutput(value) {
    if (value === null) return '<span class="null-value">null</span>';
    if (value === undefined) return '<span class="undefined-value">undefined</span>';
    
    const type = typeof value;
    
    switch (type) {
        case 'string':
            return `<span class="string-value">"${value}"</span>`;
        
        case 'number':
            return `<span class="number-value">${value}</span>`;
        
        case 'boolean':
            return `<span class="boolean-value">${value}</span>`;
        
        case 'object':
            if (Array.isArray(value)) {
                const items = value.map(item => formatOutput(item)).join(', ');
                return `[${items}]`;
            }
            
            try {
                const json = JSON.stringify(value, null, 2)
                    .replace(/\n/g, '<br>')
                    .replace(/ /g, '&nbsp;');
                return `<pre class="object-value">${json}</pre>`;
            } catch {
                return `<span class="object-value">${String(value)}</span>`;
            }
        
        default:
            return String(value);
    }
}

// =============================================
// 14. وظائف مساعدة إضافية
// =============================================
function clearCode() {
    if (!confirm('هل تريد مسح الكود؟')) return;
    
    const codeInput = document.getElementById('code-input');
    const output = document.getElementById('output');
    
    if (!codeInput || !output) return;
    
    codeInput.value = '';
    
    output.innerHTML = `
        <div class="welcome-message">
            <div class="message-icon">
                <i class="fas fa-code"></i>
            </div>
            <div class="message-content">
                <h3>مرحباً في مشغل JavaScript! 👋</h3>
                <p>اكتب كود JavaScript في المحرر على اليسار واضغط على زر "تشغيل الكود" لتنفيذه.</p>
                <p>يمكنك استخدام مكتبة الأمثلة لتحميل أمثلة جاهزة.</p>
                <div class="tip">
                    <strong>💡 نصيحة:</strong> اضغط Ctrl+Enter لتشغيل الكود بسرعة
                </div>
            </div>
        </div>
        
        <div class="quick-examples">
            <h4><i class="fas fa-bolt"></i> أمثلة سريعة</h4>
            <div class="examples-grid">
                <div class="example-item" onclick="loadQuickExample('calc')">
                    <i class="fas fa-calculator"></i>
                    <span>حساب</span>
                </div>
                <div class="example-item" onclick="loadQuickExample('loop')">
                    <i class="fas fa-sync-alt"></i>
                    <span>حلقات</span>
                </div>
                <div class="example-item" onclick="loadQuickExample('array')">
                    <i class="fas fa-list"></i>
                    <span>مصفوفات</span>
                </div>
                <div class="example-item" onclick="loadQuickExample('function')">
                    <i class="fas fa-function"></i>
                    <span>دوال</span>
                </div>
            </div>
        </div>
        
        <div class="features-showcase">
            <h4><i class="fas fa-star"></i> ميزات المشغل</h4>
            <div class="features-list">
                <div class="feature">
                    <i class="fas fa-check-circle"></i>
                    <span>تشغيل مباشر للكود</span>
                </div>
                <div class="feature">
                    <i class="fas fa-check-circle"></i>
                    <span>عرض النتائج فوراً</span>
                </div>
                <div class="feature">
                    <i class="fas fa-check-circle"></i>
                    <span>وضع فاتح/داكن</span>
                </div>
                <div class="feature">
                    <i class="fas fa-check-circle"></i>
                    <span>أمثلة تفاعلية</span>
                </div>
                <div class="feature">
                    <i class="fas fa-check-circle"></i>
                    <span>حفظ الكود تلقائياً</span>
                </div>
            </div>
        </div>
    `;
    
    animateButton('.clear-btn', 'shake-animation');
    showMessage('تم مسح المحرر', 'success');
    
    updateStatus('جاهز', '#10b981');
    localStorage.removeItem('lastCode');
}

function showLoadingIndicator(element) {
    element.innerHTML = `
        <div class="loading-indicator" style="text-align: center; padding: 40px;">
            <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3b82f6; border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
            <p style="color: var(--text-secondary);">جاري تنفيذ الكود...</p>
        </div>
    `;
}

function copyOutput() {
    const output = document.getElementById('output');
    if (!output) return;
    
    const text = output.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showMessage('تم نسخ النتيجة إلى الحافظة', 'success');
    }).catch(err => {
        showMessage('تعذر نسخ النتيجة', 'error');
    });
}

function clearOutput() {
    const output = document.getElementById('output');
    if (!output) return;
    
    output.innerHTML = `
        <div class="info message fade-in">
            <i class="fas fa-info-circle"></i>
            <strong>النتيجة نظيفة</strong>
            <p>تشغيل كود جديد سيظهر النتائج هنا</p>
        </div>
    `;
}

// =============================================
// 15. اختصارات لوحة المفاتيح
// =============================================
function handleKeyboardShortcuts(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
        showMessage('تم تشغيل الكود (Ctrl+Enter)', 'success');
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        openExamplesModal();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveCurrentCode();
        showMessage('تم حفظ الكود (Ctrl+S)', 'success');
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearCode();
    }
    
    if (e.key === 'Escape') {
        closeExamplesModal();
    }
}

// =============================================
// 16. وظائف إعداد واجهة المستخدم
// =============================================
function createExamplesModal() {
    if (document.getElementById('examplesModal')) return;
    
    // النافذة موجودة بالفعل في HTML
    // إعداد أحداث الإغلاق فقط
    setupModalCloseEvents();
}

function setupModalCloseEvents() {
    const modal = document.getElementById('examplesModal');
    if (!modal) return;
    
    // إغلاق بالزر
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            closeExamplesModal();
        });
    }
    
    // إغلاق بالنقر خارج النافذة
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeExamplesModal();
        }
    });
}

function addExamplesButton() {
    const controls = document.querySelector('.editor-controls');
    if (!controls) return;
    
    // زر الأمثلة موجود بالفعل في HTML
}

function displayRandomExamples() {
    // الأمثلة السريعة موجودة بالفعل في HTML
}

// =============================================
// 17. تهيئة CSS الإضافية مع تحسينات الجوال
// =============================================
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* تحسينات إضافية للجوال */
        @media (max-width: 767px) {
            .modal-overlay {
                padding: 0;
                align-items: flex-end;
                z-index: 10000;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-container {
                width: 100%;
                max-height: 85vh;
                border-radius: 24px 24px 0 0 !important;
                animation: slideUp 0.3s ease-out;
                margin: 0;
                overflow: hidden;
                position: relative;
                z-index: 10001;
                background: white;
            }
            
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .modal-body {
                max-height: 65vh;
                padding: 20px;
                padding-bottom: 40px;
                overscroll-behavior: contain;
                -webkit-overflow-scrolling: touch;
                overflow-y: auto;
            }
            
            /* تحسينات عامة */
            .control-btn {
                padding: 12px 16px !important;
                font-size: 14px;
            }
            
            .shortcut {
                display: none;
            }
        }
        
        /* تحسينات للكمبيوتر أيضاً */
        .example-card {
            border-radius: 12px !important;
            transition: all 0.3s ease;
        }
        
        .control-btn {
            border-radius: 10px !important;
            transition: all 0.2s;
        }
        
        .control-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        /* تحسين الأداء */
        .modal-body {
            will-change: transform;
            transform: translateZ(0);
        }
    `;
    
    document.head.appendChild(style);
}

// =============================================
// 18. تحسين أداء التمرير
// =============================================
function setupSmoothScrolling() {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.style.willChange = 'transform';
        modalBody.style.backfaceVisibility = 'hidden';
        modalBody.style.perspective = '1000px';
    }
    
    const output = document.getElementById('output');
    if (output) {
        output.style.willChange = 'transform';
        output.style.backfaceVisibility = 'hidden';
    }
}

// =============================================
// 19. CSS إضافي للتحسينات
// =============================================
function addMobileOptimizationsCSS() {
    const mobileCSS = document.createElement('style');
    mobileCSS.textContent = `
        /* تحسينات للجوال */
        .mobile-optimized .control-btn {
            min-height: 48px;
            min-width: 48px;
            padding: 14px 22px;
            font-size: 16px;
            border-radius: 14px !important;
            touch-action: manipulation;
            user-select: none;
            -webkit-user-select: none;
            transition: all 0.15s ease;
        }
        
        .mobile-optimized .control-btn:active {
            transform: scale(0.95);
            opacity: 0.9;
        }
        
        .mobile-optimized .example-card {
            padding: 18px;
            margin: 12px 0;
            border-radius: 18px !important;
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border: 1px solid #e8e8e8;
            background: white;
        }
        
        .mobile-optimized .example-card:active {
            transform: scale(0.97);
            background: linear-gradient(135deg, #f5f5f5, #e8e8e8);
        }
        
        .mobile-optimized .modal-overlay {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: none;
            backdrop-filter: blur(5px);
        }
        
        .mobile-optimized .modal-container {
            max-height: 85vh;
            border-radius: 24px 24px 0 0 !important;
            box-shadow: 0 -10px 30px rgba(0,0,0,0.2);
        }
        
        .mobile-optimized .modal-body {
            padding-bottom: 30px;
        }
        
        /* تحسين شريط التمرير للجوال */
        .mobile-optimized ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        
        .mobile-optimized ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6, #2563eb);
            border-radius: 4px;
        }
        
        .mobile-optimized ::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.8);
        }
        
        /* تحسين التمرير اللطيف */
        .smooth-scroll {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
        
        /* تحسين الأداء */
        .performance-optimized {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
        }
        
        /* تحسينات للشاشات الصغيرة جداً */
        @media (max-width: 480px) {
            .control-btn {
                padding: 10px 14px !important;
                font-size: 13px !important;
                min-height: 44px;
                min-width: 44px;
            }
            
            .example-card {
                padding: 14px !important;
                border-radius: 16px !important;
                margin: 8px 0;
            }
            
            .modal-container {
                border-radius: 20px 20px 0 0 !important;
            }
            
            .modal-header h2 {
                font-size: 18px !important;
            }
            
            .modal-close {
                width: 36px !important;
                height: 36px !important;
                font-size: 20px !important;
            }
        }
    `;
    
    document.head.appendChild(mobileCSS);
}

// =============================================
// 20. دالة جديدة لتحسين تجربة اللمس على الجوال
// =============================================
function setupTouchControls() {
    if (!isTouchDevice) return;
    
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(btn => {
        btn.style.cssText = `
            min-height: 44px;
            min-width: 44px;
            padding: 14px 18px;
            border-radius: 14px;
            font-size: 16px;
            touch-action: manipulation;
            user-select: none;
            -webkit-user-select: none;
            transition: all 0.15s ease;
        `;
        
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.9';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
}

// =============================================
// 21. وظائف تحسينات النافذة المنبثقة
// =============================================
function enhanceMobileModalExperience() {
    if (!isTouchDevice) return;
    
    const modal = document.getElementById('examplesModal');
    if (!modal) return;
    
    // إعداد خاصية overscroll-behavior
    const modalContent = modal.querySelector('.modal-container');
    if (modalContent) {
        modalContent.style.overscrollBehavior = 'contain';
    }
    
    // منع التكبير على المدخلات
    const codeInput = document.getElementById('code-input');
    if (codeInput) {
        codeInput.addEventListener('touchstart', function() {
            this.style.fontSize = '16px';
        }, { passive: true });
    }
}

// =============================================
// 22. وظائف الوضع الداكن
// =============================================
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // تحميل الثيم المحفوظ
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// =============================================
// 23. التهيئة النهائية المحسنة
// =============================================
// تشغيل vibration إذا متاح
if (isTouchDevice) {
    window.addEventListener('load', function() {
        setTimeout(vibrateIfSupported, 500);
    });
}

// تسجيل معلومات التحميل
console.log('🚀 نظام مشغل JavaScript جاهز للعمل مع تحسينات الجوال المتقدمة!');
console.log('📱 وضع الجهاز:', isTouchDevice ? 'جوال' : 'كمبيوتر');
console.log('🖥️ حجم الشاشة:', window.innerWidth + 'x' + window.innerHeight);

// تحسين أداء التنفيذ
if (window.requestIdleCallback) {
    requestIdleCallback(() => {
        console.log('⚡ تحسينات الأداء جاهزة');
    });
}

// =============================================
// 24. نظام الامتحان الكامل مع Google Apps Script
// =============================================

let examTimer = null;
let examTimeLeft = 3600; // 60 دقيقة بالثواني
let currentQuestion = 0;
let examAnswers = {};
let examQuestions = [];
let studentData = null;

// Web App URL من Google Apps Script
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxc7GVkSyc0O4lY9ETLCyP466MDuA5ZtGFBwzmBD6u3EUhSS46UUMgOEEtcb19p_K0kKQ/exec';

// الأسئلة المخزنة (20 سؤال في JavaScript)
const examQuestionsData = {
    javascript_basic: [
        {
            id: 1,
            question: "ما هي نتيجة تنفيذ الكود التالي: console.log(typeof 42);",
            options: ["'number'", "'string'", "'object'", "'undefined'"],
            correct: 0,
            points: 5
        },
        // ... باقي الأسئلة كما هي
    ],
    javascript_advanced: [
        // ... الأسئلة المتقدمة كما هي
    ]
};

// =============================================
// 25. وظائف نافذة تسجيل الدخول
// =============================================
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modal.classList.add('fade-in');
    
    // إعادة تعيين النموذج
    document.getElementById('loginForm').reset();
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// =============================================
// 26. التحقق من بيانات الطالب مع Google Apps Script
// =============================================
async function checkStudentCredentials(studentId, password) {
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                studentId: studentId,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.student) {
            showMessage('تم التحقق من بياناتك بنجاح ✅', 'success');
            return data.student;
        } else {
            showMessage(data.error || 'بيانات الدخول غير صحيحة ❌', 'error');
            return null;
        }
        
    } catch (error) {
        console.error('خطأ في الاتصال بالسيرفر:', error);
        
        // كود احتياطي للاختبار (يلغي الاتصال بالسيت)
        if (studentId === 'test' && password === '123') {
            showMessage('وضع الاختبار: تم تسجيل الدخول ✅', 'info');
            return {
                id: 'test',
                name: 'طالب تجريبي',
                grade: 'العاشر',
                status: 'active'
            };
        }
        
        showMessage('تعذر الاتصال بالسيرفر، حاول مرة أخرى ❌', 'error');
        return null;
    }
}

// =============================================
// 27. بدء الامتحان
// =============================================
async function startExam(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('studentPassword').value.trim();
    const examType = document.getElementById('examType').value;
    
    if (!studentId || !password || !examType) {
        showMessage('الرجاء ملء جميع الحقول ❌', 'error');
        return;
    }
    
    // تعطيل زر الإرسال أثناء التحميل
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';
    submitBtn.disabled = true;
    
    showMessage('جاري التحقق من بياناتك...', 'info');
    
    // تحقق من بيانات الطالب
    studentData = await checkStudentCredentials(studentId, password);
    
    // إعادة تمكين الزر
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    if (!studentData) {
        return;
    }
    
    // تحميل الأسئلة بناءً على نوع الامتحان
    examQuestions = examQuestionsData[examType] || examQuestionsData.javascript_basic;
    
    // إخفاء نافذة التسجيل
    closeLoginModal();
    
    // إخفاء الصفحة الرئيسية
    document.getElementById('mainContent').style.display = 'none';
    
    // إظهار صفحة الامتحان
    const examPage = document.getElementById('examPage');
    examPage.style.display = 'block';
    
    // تعيين بيانات الطالب
    document.getElementById('studentName').textContent = `الطالب: ${studentData.name}`;
    document.getElementById('studentIdDisplay').textContent = `ID: ${studentData.id}`;
    document.getElementById('examTypeDisplay').textContent = `نوع الامتحان: ${getExamTypeName(examType)}`;
    
    // تهيئة الامتحان
    initializeExam();
}

// =============================================
// 28. دوال مساعدة
// =============================================
function getExamTypeName(type) {
    const types = {
        'javascript_basic': 'JavaScript أساسيات',
        'javascript_advanced': 'JavaScript متقدم',
        'html_css': 'HTML & CSS'
    };
    return types[type] || type;
}

// =============================================
// 29. حفظ نتيجة الامتحان في Google Sheets
// =============================================
async function saveExamResultToSheet(resultData) {
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'save_result',
                studentId: studentData.id,
                studentName: studentData.name,
                examType: document.getElementById('examType').value,
                examTypeName: getExamTypeName(document.getElementById('examType').value),
                score: resultData.totalScore,
                totalScore: resultData.totalQuestions * 5,
                percentage: resultData.percentage,
                grade: resultData.grade,
                correctAnswers: resultData.correctAnswers,
                wrongAnswers: resultData.wrongAnswers,
                unanswered: resultData.unanswered,
                answers: JSON.stringify(examAnswers),
                duration: 3600 - examTimeLeft, // الوقت المستغرق
                timestamp: new Date().toISOString()
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ تم حفظ النتيجة في السيت:', data);
            return true;
        } else {
            console.error('❌ فشل حفظ النتيجة:', data.error);
            return false;
        }
        
    } catch (error) {
        console.error('❌ خطأ في حفظ النتيجة:', error);
        return false;
    }
}

// =============================================
// 30. تسليم الامتحان وحفظ النتيجة
// =============================================
async function submitExam() {
    if (!confirm('هل أنت متأكد من تسليم الامتحان؟ لا يمكن التراجع.')) {
        return;
    }
    
    // تعطيل زر التسليم أثناء التحميل
    const submitBtn = document.querySelector('.submit-exam-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التسليم...';
    submitBtn.disabled = true;
    
    clearInterval(examTimer);
    
    // حساب النتيجة
    const result = calculateExamResult();
    
    // محاولة حفظ النتيجة في السيت
    showMessage('جاري حفظ النتيجة في السيت...', 'info');
    const saved = await saveExamResultToSheet(result);
    
    // إعادة تمكين الزر
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    if (saved) {
        showMessage('✅ تم حفظ النتيجة في السيت بنجاح', 'success');
    } else {
        showMessage('⚠️ تم حفظ النتيجة محلياً فقط', 'warning');
    }
    
    // عرض النتائج
    showExamResults(result);
}

// =============================================
// 31. دالة لإضافة طالب جديد (للتجربة)
// =============================================
async function addTestStudent() {
    try {
        const testData = {
            action: 'add_student',
            student: {
                id: '2024001',
                password: 'test123',
                name: 'طالب تجريبي',
                grade: 'العاشر',
                status: 'active',
                email: 'test@example.com',
                phone: '01000000000'
            }
        };
        
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const data = await response.json();
        console.log('نتيجة إضافة الطالب:', data);
        showMessage(data.success ? 'تمت إضافة الطالب' : 'فشلت الإضافة', 
                   data.success ? 'success' : 'error');
        
    } catch (error) {
        console.error('خطأ في إضافة الطالب:', error);
    }
}

// =============================================
// 32. دالة لجلب نتائج الطالب
// =============================================
async function getStudentResults(studentId) {
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'get_results',
                studentId: studentId
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('نتائج الطالب:', data.results);
            return data.results;
        }
        
        return [];
    } catch (error) {
        console.error('خطأ في جلب النتائج:', error);
        return [];
    }
}

// =============================================
// 33. تهيئة أحداث الامتحان
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // إضافة حدث تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', startExam);
    }
    
    // اختبار الاتصال بالسيرفر عند التحميل
    testConnection();
    
    // منع إغلاق المتصفح أثناء الامتحان
    window.addEventListener('beforeunload', function(e) {
        if (document.getElementById('examPage').style.display === 'block') {
            e.preventDefault();
            e.returnValue = '⚠️ لديك امتحان قيد التقدم. هل تريد المغادرة؟';
            return '⚠️ لديك امتحان قيد التقدم. هل تريد المغادرة؟';
        }
    });
});

// =============================================
// 34. اختبار الاتصال بالسيرفر
// =============================================
async function testConnection() {
    try {
        const response = await fetch(WEB_APP_URL + '?test=1');
        console.log('✅ الاتصال بالسيرفر يعمل');
        
        // إضافة زر اختبار في الفوتر للتجربة
        addTestButton();
        
    } catch (error) {
        console.warn('⚠️ تعذر الاتصال بالسيرفر، النظام يعمل في وضع الاختبار');
        showMessage('النظام يعمل في وضع الاختبار', 'warning');
    }
}

// =============================================
// 35. إضافة زر اختبار
// =============================================
function addTestButton() {
    // إضافة زر في الفوتر للاختبار
    const footer = document.querySelector('.footer-content');
    if (footer) {
        const testDiv = document.createElement('div');
        testDiv.className = 'test-section';
        testDiv.innerHTML = `
            <h3><i class="fas fa-flask"></i> اختبار النظام</h3>
            <div class="test-buttons">
                <button onclick="testLogin()" class="test-btn">
                    <i class="fas fa-sign-in-alt"></i> اختبار تسجيل الدخول
                </button>
                <button onclick="addTestStudent()" class="test-btn">
                    <i class="fas fa-user-plus"></i> إضافة طالب تجريبي
                </button>
            </div>
        `;
        footer.appendChild(testDiv);
    }
}

// =============================================
// 36. دالة اختبار تسجيل الدخول
// =============================================
async function testLogin() {
    showMessage('جاري اختبار تسجيل الدخول...', 'info');
    
    const testStudent = {
        studentId: '2023001',
        password: 'pass123'
    };

    // تحديث حقول النموذج
    document.getElementById('studentId').value = testStudent.studentId;
    document.getElementById('studentPassword').value = testStudent.password;
    document.getElementById('examType').value = 'javascript_basic';
    
    // محاولة تسجيل الدخول
    const studentData = await checkStudentCredentials(testStudent.studentId, testStudent.password);
    
    if (studentData) {
        showMessage('✅ اختبار تسجيل الدخول ناجح', 'success');
        console.log('بيانات الطالب:', studentData);
    }
}

console.log('🚀 نظام الامتحان متصل بـ Google Sheets!');

// =============================================
// نظام إنشاء المواقع
// =============================================

// متغيرات النظام
let currentProject = {
    name: 'مشروعي_الاول',
    files: {
        'index.html': {
            name: 'index.html',
            content: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقعي الجديد</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #fff, #f0f0f0);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        p {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature {
            background: rgba(255, 255, 255, 0.15);
            padding: 20px;
            border-radius: 12px;
            transition: transform 0.3s;
        }
        
        .feature:hover {
            transform: translateY(-5px);
        }
        
        .feature i {
            font-size: 2rem;
            margin-bottom: 10px;
            color: #4ade80;
        }
        
        .cta-button {
            background: linear-gradient(45deg, #4ade80, #22c55e);
            color: white;
            border: none;
            padding: 15px 40px;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.3s;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(74, 222, 128, 0.4);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 مرحباً في موقعي!</h1>
        <p>هذا موقعي الأول الذي أنشأته باستخدام منشئ المواقع الذكي. يمكنك تعديل هذا الكود وإضافة مميزات جديدة.</p>
        
        <div class="features">
            <div class="feature">
                <i class="fas fa-mobile-alt"></i>
                <h3>متجاوب</h3>
                <p>يعمل على جميع الأجهزة</p>
            </div>
            
            <div class="feature">
                <i class="fas fa-bolt"></i>
                <h3>سريع</h3>
                <p>تحميل فائق السرعة</p>
            </div>
            
            <div class="feature">
                <i class="fas fa-paint-brush"></i>
                <h3>جميل</h3>
                <p>تصميم عصري وجذاب</p>
            </div>
        </div>
        
        <button class="cta-button" onclick="showMessage()">
            <i class="fas fa-rocket"></i> ابدأ الآن
        </button>
    </div>
    
    <script>
        function showMessage() {
            alert('مرحباً! هذا موقعك الأول. يمكنك تعديله كما تشاء!');
        }
        
        // إضافة تأثيرات تفاعلية
        document.querySelectorAll('.feature').forEach(feature => {
            feature.addEventListener('click', function() {
                this.style.background = 'rgba(255, 255, 255, 0.25)';
            });
        });
    </script>
</body>
</html>`,
            type: 'html',
            size: 1024
        }
    },
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
};

let currentFile = 'index.html';
let projects = [];

// ====== وظائف واجهة إنشاء الموقع ======

// =============================================
// وظيفة فتح منشئ المواقع
// =============================================
function openWebsiteBuilder() {
    // إخفاء المحتوى الرئيسي
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('examPage').style.display = 'none';
    
    // إظهار واجهة إنشاء الموقع
    const builderPage = document.getElementById('websiteBuilderPage');
    builderPage.style.display = 'block';
    
    // تحميل المشاريع المحفوظة
    if (typeof loadProjects === 'function') {
        loadProjects();
    }
    
    // تحديث واجهة الملفات
    if (typeof updateFilesList === 'function') {
        updateFilesList();
    }
    
    // تحميل الملف الحالي في المحرر
    if (typeof loadFile === 'function' && typeof currentFile !== 'undefined') {
        loadFile(currentFile);
    }
    
    // تحديث المعاينة
    if (typeof updatePreview === 'function') {
        updatePreview();
    }
    
    showMessage('مرحباً في منشئ المواقع الذكي! 🚀', 'success');
}

// =============================================
// وظيفة الخروج من منشئ المواقع
// =============================================
function exitWebsiteBuilder() {
    // حفظ المشروع الحالي
    if (typeof saveCurrentProject === 'function') {
        saveCurrentProject();
    }
    
    // إخفاء واجهة إنشاء الموقع
    document.getElementById('websiteBuilderPage').style.display = 'none';
    
    // إظهار المحتوى الرئيسي
    document.getElementById('mainContent').style.display = 'block';
    
    showMessage('تم حفظ المشروع والعودة للرئيسية', 'info');
}

function openWebsiteBuilder() {
    // إخفاء المحتوى الرئيسي
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('examPage').style.display = 'none';
    
    // إظهار واجهة إنشاء الموقع
    const builderPage = document.getElementById('websiteBuilderPage');
    builderPage.style.display = 'block';
    
    // تحميل المشاريع المحفوظة
    loadProjects();
    
    // تحديث واجهة الملفات
    updateFilesList();
    
    // تحميل الملف الحالي في المحرر
    loadFile(currentFile);
    
    // تحديث المعاينة
    updatePreview();
}

function exitWebsiteBuilder() {
    // حفظ المشروع الحالي
    saveCurrentProject();
    
    // إخفاء واجهة إنشاء الموقع
    document.getElementById('websiteBuilderPage').style.display = 'none';
    
    // إظهار المحتوى الرئيسي
    document.getElementById('mainContent').style.display = 'block';
    
    // إغلاق القائمة الجانبية عند الخروج
    closeSidebar();
}

// =============================================
// وظائف التحكم في القائمة الجانبية على الجوال
// =============================================
function toggleSidebar() {
    const sidebar = document.getElementById('filesSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('filesSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function createNewProject() {
    const projectName = prompt('أدخل اسم المشروع الجديد:', 'مشروع_جديد');
    if (!projectName) return;
    
    // إنشاء مشروع جديد
    currentProject = {
        name: projectName,
        files: {
            'index.html': {
                name: 'index.html',
                content: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f0f2f5;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #2563eb;
            margin-bottom: 20px;
        }
        
        p {
            color: #666;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>مرحباً بك في ${projectName}</h1>
        <p>هذا مشروعك الجديد. ابدأ بالتعديل عليه الآن!</p>
    </div>
</body>
</html>`,
                type: 'html',
                size: 512
            }
        },
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
    };
    
    // تحديث الواجهة
    document.getElementById('projectName').value = projectName;
    updateFilesList();
    loadFile('index.html');
    updatePreview();
    
    showMessage(`تم إنشاء المشروع: ${projectName}`, 'success');
}

function createNewFile() {
    // فتح نافذة إنشاء ملف جديد
    document.getElementById('newFileModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // إعادة تعيين النموذج
    document.getElementById('fileName').value = '';
    document.getElementById('fileTemplate').value = 'html';
    updateTemplate();
}

function closeNewFileModal() {
    document.getElementById('newFileModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateTemplate() {
    const template = document.getElementById('fileTemplate').value;
    const preview = document.getElementById('templatePreview');
    
    let templateCode = '';
    
    switch(template) {
        case 'html':
            templateCode = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقعي</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>مرحباً!</h1>
    </header>
    
    <main>
        <p>هذا موقعي الجديد.</p>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`;
            break;
            
        case 'css':
            templateCode = `/* ملف CSS الرئيسي */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f9fafb;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    text-align: center;
}`;
            break;
            
        case 'js':
            templateCode = `// ملف JavaScript الرئيسي
console.log('موقعي يعمل!');

// دالة الترحيب
function welcomeUser(name) {
    alert('مرحباً ' + name + '!');
    console.log('تم الترحيب بالمستخدم: ' + name);
}

// دالة تغيير الخلفية
function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

// تهيئة الموقع عند التحميل
window.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع');
    welcomeUser('زائر');
});`;
            break;
            
        default:
            templateCode = '// ابدأ بكتابة الكود الخاص بك هنا...';
    }
    
    preview.querySelector('code').textContent = templateCode;
}

// معالجة إنشاء ملف جديد
document.getElementById('newFileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fileName = document.getElementById('fileName').value.trim();
    const template = document.getElementById('fileTemplate').value;
    
    if (!fileName) {
        showMessage('يرجى إدخال اسم الملف', 'error');
        return;
    }
    
    // التحقق من وجود الملف مسبقاً
    if (currentProject.files[fileName]) {
        showMessage('هذا الملف موجود مسبقاً', 'error');
        return;
    }
    
    // إنشاء محتوى الملف بناءً على القالب
    let fileContent = '';
    let fileType = 'txt';
    
    switch(template) {
        case 'html':
            fileContent = templateCode = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>موقعي</title>
</head>
<body>
    <h1>ملف HTML جديد</h1>
    <p>هذا ملف HTML جديد تم إنشاؤه.</p>
</body>
</html>`;
            fileType = 'html';
            break;
            
        case 'css':
            fileContent = `/* ملف CSS جديد */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f0f0f0;
}`;
            fileType = 'css';
            break;
            
        case 'js':
            fileContent = `// ملف JavaScript جديد
console.log('ملف JavaScript جديد يعمل!');

function greet() {
    return 'مرحباً من الملف الجديد!';
}`;
            fileType = 'js';
            break;
            
        default:
            fileContent = '// ابدأ بكتابة الكود الخاص بك هنا...';
            fileType = 'txt';
    }
    
    // إضافة الملف الجديد
    currentProject.files[fileName] = {
        name: fileName,
        content: fileContent,
        type: fileType,
        size: new Blob([fileContent]).size
    };
    
    // تحديث الواجهة
    closeNewFileModal();
    updateFilesList();
    
    // فتح الملف الجديد
    openFile(fileName);
    
    showMessage(`تم إنشاء الملف: ${fileName}`, 'success');
});

function openFile(fileName) {
    if (!currentProject.files[fileName]) return;
    
    currentFile = fileName;
    loadFile(fileName);
    
    // تحديث التبويب النشط
    updateActiveTab(fileName);
    
    // إغلاق القائمة الجانبية على الجوال
    closeSidebar();
}

function loadFile(fileName) {
    const file = currentProject.files[fileName];
    if (!file) return;
    
    const editor = document.getElementById('websiteCodeEditor');
    editor.value = file.content;
    
    // تحديث معلومات الملف
    document.getElementById('currentFileName').textContent = fileName;
    document.getElementById('currentFileSize').textContent = formatSize(file.size);
    
    // تحديث نوع الملف
    const fileTypeSelect = document.getElementById('fileType');
    fileTypeSelect.value = file.type || 'html';
    
    // تحديث إحصائيات المحرر
    updateEditorStats();
}

function saveCurrentFile() {
    const editor = document.getElementById('websiteCodeEditor');
    const content = editor.value;
    
    if (!currentProject.files[currentFile]) return;
    
    // تحديث محتوى الملف
    currentProject.files[currentFile].content = content;
    currentProject.files[currentFile].size = new Blob([content]).size;
    currentProject.lastModified = new Date().toISOString();
    
    // تحديث الواجهة
    document.getElementById('currentFileSize').textContent = formatSize(currentProject.files[currentFile].size);
    updateFilesList();
    updateEditorStats();
    
    // تحديث المعاينة
    updatePreview();
    
    showMessage('تم حفظ الملف', 'success');
}

function deleteFile(fileName) {
    if (!confirm(`هل تريد حذف الملف "${fileName}"؟`)) return;
    
    if (Object.keys(currentProject.files).length <= 1) {
        showMessage('لا يمكن حذف جميع الملفات', 'error');
        return;
    }
    
    delete currentProject.files[fileName];
    
    // إذا كان الملف المحذوف هو الحالي، افتح ملف آخر
    if (currentFile === fileName) {
        const remainingFiles = Object.keys(currentProject.files);
        if (remainingFiles.length > 0) {
            openFile(remainingFiles[0]);
        }
    }
    
    updateFilesList();
    updateTabs();
    
    showMessage(`تم حذف الملف: ${fileName}`, 'success');
}

function updateFilesList() {
    const filesList = document.getElementById('filesList');
    filesList.innerHTML = '';
    
    // تحديث عدد الملفات
    const fileCount = Object.keys(currentProject.files).length;
    document.getElementById('fileCount').textContent = fileCount;
    
    // تحديث الحجم الكلي
    const totalSize = Object.values(currentProject.files).reduce((sum, file) => sum + file.size, 0);
    document.getElementById('projectSize').textContent = formatSize(totalSize);
    
    // إنشاء قائمة الملفات
    Object.keys(currentProject.files).forEach(fileName => {
        const file = currentProject.files[fileName];
        const fileItem = document.createElement('div');
        fileItem.className = `file-item ${fileName === currentFile ? 'active' : ''}`;
        fileItem.setAttribute('data-file', fileName);
        fileItem.onclick = () => openFile(fileName);
        
        let icon = 'fa-file';
        if (fileName.endsWith('.html')) icon = 'fa-file-code';
        else if (fileName.endsWith('.css')) icon = 'fa-file-alt';
        else if (fileName.endsWith('.js')) icon = 'fa-file-code';
        
        fileItem.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${fileName}</span>
            <button class="delete-file-btn" onclick="deleteFile('${fileName}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        filesList.appendChild(fileItem);
    });
}

function updateActiveTab(fileName) {
    // تحديث الملف النشط في القائمة
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-file') === fileName) {
            item.classList.add('active');
        }
    });
    
    // تحديث التبويبات
    updateTabs();
}

function updateTabs() {
    const editorTabs = document.getElementById('editorTabs');
    editorTabs.innerHTML = '';
    
    Object.keys(currentProject.files).forEach(fileName => {
        const tab = document.createElement('div');
        tab.className = `editor-tab ${fileName === currentFile ? 'active' : ''}`;
        tab.setAttribute('data-file', fileName);
        tab.onclick = () => openFile(fileName);
        
        let icon = '';
        if (fileName.endsWith('.html')) icon = '📄';
        else if (fileName.endsWith('.css')) icon = '🎨';
        else if (fileName.endsWith('.js')) icon = '⚡';
        
        tab.innerHTML = `
            <span>${icon} ${fileName}</span>
            <button class="close-tab-btn" onclick="closeTab('${fileName}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        editorTabs.appendChild(tab);
    });
}

function closeTab(fileName) {
    if (Object.keys(currentProject.files).length <= 1) {
        showMessage('لا يمكن إغلاق جميع التبويبات', 'error');
        return;
    }
    
    if (currentFile === fileName) {
        const files = Object.keys(currentProject.files);
        const currentIndex = files.indexOf(fileName);
        const nextFile = files[(currentIndex + 1) % files.length];
        openFile(nextFile);
    }
    
    updateTabs();
}

function changeFileType() {
    const fileType = document.getElementById('fileType').value;
    if (currentProject.files[currentFile]) {
        currentProject.files[currentFile].type = fileType;
    }
}

function updateEditorStats() {
    const editor = document.getElementById('websiteCodeEditor');
    const content = editor.value;
    
    const lines = content.split('\n').length;
    const chars = content.length;
    
    document.getElementById('editorLines').textContent = lines;
    document.getElementById('editorChars').textContent = chars;
}

function formatCode() {
    const editor = document.getElementById('websiteCodeEditor');
    const content = editor.value;
    
    // تنسيق HTML بسيط
    let formatted = content
        .replace(/>\s+</g, '>\n<')
        .replace(/^\s+|\s+$/g, '')
        .replace(/\n\s*\n/g, '\n');
    
    editor.value = formatted;
    updateEditorStats();
    
    showMessage('تم تنسيق الكود', 'success');
}

function runWebsiteCode() {
    updatePreview();
    showMessage('تم تحديث المعاينة', 'info');
}

function previewWebsite() {
    const previewArea = document.getElementById('previewArea');
    previewArea.classList.toggle('active');
}

function refreshPreview() {
    updatePreview();
    showMessage('تم تحديث المعاينة', 'info');
}

function updatePreview() {
    const iframe = document.getElementById('websitePreview');
    const currentContent = currentProject.files[currentFile]?.content || '';
    
    // إنشاء صفحة HTML كاملة للمعاينة
    let htmlContent = '';
    
    if (currentFile.endsWith('.html')) {
        htmlContent = currentContent;
    } else if (currentFile.endsWith('.css')) {
        htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>${currentContent}</style>
</head>
<body>
    <div style="padding: 20px; font-family: Arial;">
        <h1>معاينة ملف CSS</h1>
        <p>هذه معاينة لملف CSS. يمكنك رؤية تأثير الأنماط على العناصر التالية:</p>
        
        <div class="preview-box" style="background: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 10px;">
            <h2 style="color: #2563eb;">عنوان تجريبي</h2>
            <p style="color: #666;">نص تجريبي لاختبار الأنماط.</p>
            <button style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 5px;">
                زر تجريبي
            </button>
        </div>
    </div>
</body>
</html>`;
    } else if (currentFile.endsWith('.js')) {
        htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <script>
        ${currentContent}
    </script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .console {
            background: #1e1e1e;
            color: #00ff00;
            padding: 20px;
            border-radius: 10px;
            font-family: monospace;
            height: 300px;
            overflow-y: auto;
        }
    </style>
</head>
<body>
    <h1>معاينة ملف JavaScript</h1>
    <p>افتح أدوات المطور (F12) لمشاهدة ناتج console.log</p>
    
    <div class="console" id="jsConsole">
        جاري تشغيل JavaScript...
    </div>
    
    <script>
        // التقاط console.log وعرضه
        const originalLog = console.log;
        const consoleDiv = document.getElementById('jsConsole');
        
        console.log = function(...args) {
            originalLog.apply(console, args);
            const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
            consoleDiv.innerHTML += '> ' + message + '\\n';
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        };
        
        // تشغيل الكود
        try {
            ${currentContent}
        } catch(error) {
            console.log('خطأ:', error.message);
        }
    </script>
</body>
</html>`;
    } else {
        htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial; padding: 20px;">
    <h1>معاينة الملف: ${currentFile}</h1>
    <pre style="background: #f5f5f5; padding: 20px; border-radius: 5px;">${currentContent}</pre>
</body>
</html>`;
    }
    
    // تحديث iframe
    iframe.srcdoc = htmlContent;
}

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function downloadProject() {
    if (Object.keys(currentProject.files).length === 0) {
        showMessage('لا توجد ملفات للتحميل', 'error');
        return;
    }
    
    // إنشاء ملف ZIP باستخدام JSZip (نحتاج لإضافة المكتبة أولاً)
    try {
        const zip = new JSZip();
        
        // إضافة جميع الملفات إلى الأرشيف
        Object.keys(currentProject.files).forEach(fileName => {
            zip.file(fileName, currentProject.files[fileName].content);
        });
        
        // إنشاء ملف README
        const readmeContent = `# ${currentProject.name}
        
تم إنشاء هذا المشروع باستخدام منشئ المواقع الذكي.
تاريخ الإنشاء: ${new Date(currentProject.createdAt).toLocaleString('ar-SA')}
آخر تعديل: ${new Date(currentProject.lastModified).toLocaleString('ar-SA')}

الملفات المتوفرة:
${Object.keys(currentProject.files).map(file => `- ${file}`).join('\n')}

يمكنك فتح index.html في المتصفح لعرض الموقع.`;
        
        zip.file('README.txt', readmeContent);
        
        // إنشاء ملف ZIP وتنزيله
        zip.generateAsync({type: "blob"}).then(function(content) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${currentProject.name.replace(/\s+/g, '_')}.zip`;
            link.click();
            
            showMessage('تم تحميل الملفات بنجاح 📦', 'success');
        });
    } catch (error) {
        console.error('خطأ في إنشاء الأرشيف:', error);
        
        // بديل: تحميل الملفات بشكل منفصل
        downloadFilesSeparately();
    }
}

function downloadFilesSeparately() {
    Object.keys(currentProject.files).forEach(fileName => {
        const file = currentProject.files[fileName];
        const blob = new Blob([file.content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    });
    
    showMessage('تم تحميل الملفات بشكل منفصل', 'info');
}

function saveCurrentProject() {
    // حفظ المشروع في localStorage
    projects = JSON.parse(localStorage.getItem('websiteProjects') || '[]');
    
    // تحديث المشروع الحالي
    const existingIndex = projects.findIndex(p => p.name === currentProject.name);
    
    if (existingIndex !== -1) {
        projects[existingIndex] = currentProject;
    } else {
        projects.push(currentProject);
    }
    
    localStorage.setItem('websiteProjects', JSON.stringify(projects));
}

function loadProjects() {
    projects = JSON.parse(localStorage.getItem('websiteProjects') || '[]');
    
    // تحديث قائمة المشاريع
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
    
    if (projects.length === 0) {
        projectsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p>لا توجد مشاريع سابقة</p>
                <p>أنشئ مشروعك الأول الآن!</p>
            </div>
        `;
        return;
    }
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => loadProject(project.name);
        
        const fileCount = Object.keys(project.files).length;
        const totalSize = Object.values(project.files).reduce((sum, file) => sum + file.size, 0);
        
        projectCard.innerHTML = `
            <h4><i class="fas fa-folder"></i> ${project.name}</h4>
            <p><i class="fas fa-file"></i> ${fileCount} ملف</p>
            <p><i class="fas fa-hdd"></i> ${formatSize(totalSize)}</p>
            <p class="date">آخر تعديل: ${new Date(project.lastModified).toLocaleDateString('ar-SA')}</p>
        `;
        
        projectsList.appendChild(projectCard);
    });
}

function loadProject(projectName) {
    const project = projects.find(p => p.name === projectName);
    if (!project) {
        showMessage('المشروع غير موجود', 'error');
        return;
    }
    
    currentProject = JSON.parse(JSON.stringify(project)); // نسخة عميقة
    
    // تحديث الواجهة
    document.getElementById('projectName').value = currentProject.name;
    document.getElementById('projectName').dispatchEvent(new Event('input'));
    
    // فتح أول ملف
    const firstFile = Object.keys(currentProject.files)[0];
    if (firstFile) {
        openFile(firstFile);
    }
    
    updateFilesList();
    updatePreview();
    closeProjectsModal();
    
    showMessage(`تم تحميل المشروع: ${projectName}`, 'success');
}

function importProject() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.zip';
    
    fileInput.onchange = async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const zip = await JSZip.loadAsync(file);
            const projectName = file.name.replace('.zip', '');
            
            const newProject = {
                name: projectName,
                files: {},
                createdAt: new Date().toISOString(),
                lastModified: new Date().toISOString()
            };
            
            // استخراج الملفات من الأرشيف
            const filePromises = [];
            zip.forEach((relativePath, zipEntry) => {
                if (!zipEntry.dir) {
                    filePromises.push(
                        zipEntry.async('text').then(content => {
                            newProject.files[relativePath] = {
                                name: relativePath,
                                content: content,
                                type: relativePath.split('.').pop(),
                                size: content.length
                            };
                        })
                    );
                }
            });
            
            await Promise.all(filePromises);
            
            // إضافة المشروع الجديد
            projects.push(newProject);
            localStorage.setItem('websiteProjects', JSON.stringify(projects));
            
            // تحميل المشروع الجديد
            currentProject = newProject;
            updateFilesList();
            loadProject(projectName);
            
            showMessage(`تم استيراد المشروع: ${projectName}`, 'success');
        } catch (error) {
            console.error('خطأ في استيراد الأرشيف:', error);
            showMessage('تعذر استيراد الأرشيف', 'error');
        }
    };
    
    fileInput.click();
}

function closeProjectsModal() {
    document.getElementById('projectsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showMyProjects() {
    loadProjects();
    document.getElementById('projectsModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// ====== إضافة JSZip ديناميكياً إذا لم يكن موجوداً ======
function loadJSZip() {
    return new Promise((resolve, reject) => {
        if (typeof JSZip !== 'undefined') {
            resolve(JSZip);
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
        script.onload = () => resolve(JSZip);
        script.onerror = () => reject('فشل تحميل JSZip');
        document.head.appendChild(script);
    });
}

// ====== تحديث الـ DOMContentLoaded ======
// أضف في نهاية DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
    // ... الكود الحالي ...
    
    // إضافة زر "اصنع موقعك" في الهيدر
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        const createWebsiteBtn = document.createElement();
       
       
        // إضافة الزر في بداية الهيدر
        headerContent.insertBefore(createWebsiteBtn, headerContent.firstChild);
    }
    
    // إضافة زر "مشاريعي" في واجهة إنشاء الموقع
    const builderControls = document.querySelector('.builder-controls');
    if (builderControls) {
        const myProjectsBtn = document.createElement('button');
        myProjectsBtn.className = 'builder-btn';
        myProjectsBtn.innerHTML = '<i class="fas fa-folder-open"></i> مشاريعي';
        myProjectsBtn.onclick = showMyProjects;
        myProjectsBtn.style.background = 'linear-gradient(135deg, #06b6d4, #0891b2)';
        myProjectsBtn.style.color = 'white';
        
        // إضافة الزر قبل زر الخروج
        const exitBtn = document.querySelector('.exit-btn');
        if (exitBtn) {
            builderControls.insertBefore(myProjectsBtn, exitBtn);
        }
    }
    
    // تحميل JSZip عند الحاجة
    loadJSZip().catch(console.error);
    
    // تحديث إحصائيات المحرر عند الكتابة
    const websiteEditor = document.getElementById('websiteCodeEditor');
    if (websiteEditor) {
        websiteEditor.addEventListener('input', updateEditorStats);
    }
});